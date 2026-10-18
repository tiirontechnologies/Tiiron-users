import {
    Box,
    Typography,
    TextField,
    Stack,
    Paper,
    Button,
    Divider,
    Container,
    Breadcrumbs,
    CircularProgress,
    Alert,
} from '@mui/material';
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useGetCartQuery } from '../../course-browse/api/courseApi';
import {
    useGetCheckoutCourseQuery,
    useGetCheckoutQuoteMutation,
    useValidateCourseCouponMutation,
    useCreateOrderMutation,
    useVerifyPaymentMutation,
} from '../api/checkoutapi';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { useGetChaptersQuery } from '../../course-glossary/api/courseApi';
import { useCheckAuthQuery } from '../../../api/api.routes';

export default function CheckoutPage() {
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState("");
    const [quote, setQuote] = useState<any>(null);
    const [couponError, setCouponError] = useState("");
    const [quoteError, setQuoteError] = useState("");
    const [paymentMessage, setPaymentMessage] = useState("");
    const [paymentMessageType, setPaymentMessageType] = useState<"error" | "success" | "info">("info");
    const paymentInProgress = useRef(false);
    const paymentVerificationStarted = useRef(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { data: cartData } = useGetCartQuery();
    const { data: currentUserResponse } = useCheckAuthQuery();
    const currentUser = currentUserResponse?.data;

    // Get course ID from multiple sources (priority order)
    const getCourseId = (): number => {
        // 1. Try URL search params  -> /checkout?courseId=6
        const courseIdParam = searchParams.get('courseId');
        if (courseIdParam) {
            const id = Number(courseIdParam);
            if (!isNaN(id) && id > 0) return id;
        }

        // 2. Try location state
        const stateCourseId = (location.state as any)?.courseId;
        if (stateCourseId) {
            const id = Number(stateCourseId);
            if (!isNaN(id) && id > 0) return id;
        }

        // 3. Try to get from cart (first course)
        const firstCartItem = cartData?.data?.items?.[0];
        if (firstCartItem?.courseId) {
            return Number(firstCartItem.courseId);
        }

        // 4. Default fallback
        return 7;
    };

    const courseId = getCourseId();
    const { data: chaptersResponse } = useGetChaptersQuery({ id: courseId, page: 1, limit: 100 });
    const chapters = chaptersResponse?.data?.chapters ?? [];

    // ðŸ”´ Dynamic fetch â€” hits GET /course/:id via checkoutapi.ts
    const {
        data: courseResponse,
        isLoading: isCourseLoading,
        isError: isCourseError,
        error: courseError,
    } = useGetCheckoutCourseQuery(courseId);

    // Adjust this line if your API wraps the course differently
    // (e.g. courseResponse?.data vs courseResponse?.data?.course)
    const course = courseResponse?.data ?? courseResponse;

    // ---- Derive display values from the fetched course (with safe fallbacks) ----
    const courseTitle = course?.title ?? course?.name ?? "â€”";
    const courseCategory = course?.category?.name ?? course?.category ?? course?.tag ?? "";
    const courseImage = course?.thumbnail ?? course?.image ?? "images/chekoutPage_image.png";
    const totalLectures = chapters.reduce(
        (total: number, chapter: any) => total + (Array.isArray(chapter?.units) ? chapter.units.length : 0),
        0,
    );
    const totalHours = course?.totalHours ?? course?.duration ?? 0;

    const price = Number(quote?.originalPrice ?? 0);
    const discount = Number(quote?.discountAmount ?? 0);
    const total = Number(quote?.finalPrice ?? 0);

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0);

    const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();
    const [verifyPayment] = useVerifyPaymentMutation();
    const [getCheckoutQuote, { isLoading: isQuoteLoading }] = useGetCheckoutQuoteMutation();
    const [validateCourseCoupon, { isLoading: isApplyingCoupon }] = useValidateCourseCouponMutation();

    useEffect(() => {
        let active = true;
        setQuote(null);
        setQuoteError("");
        getCheckoutQuote({ courseId })
            .unwrap()
            .then((response: any) => {
                if (active) setQuote(response?.data?.data ?? response?.data ?? response);
            })
            .catch((error: any) => {
                if (active) setQuoteError(error?.data?.message || "Could not load the checkout price.");
            });
        return () => { active = false; };
    }, [courseId, getCheckoutQuote]);

    const handleApplyCoupon = async () => {
        const code = couponCode.trim();
        if (!code) {
            setCouponError("Enter a coupon code.");
            return;
        }
        setCouponError("");
        try {
            const response: any = await validateCourseCoupon({ courseId, couponCode: code }).unwrap();
            setQuote(response?.data?.data ?? response?.data ?? response);
            setAppliedCoupon(code);
        } catch (error: any) {
            setCouponError(error?.data?.message || error?.data?.errors?.[0]?.message || "This coupon could not be applied.");
        }
    };

    // ðŸ”´ Load Razorpay checkout.js
    const loadRazorpayScript = () =>
        new Promise<boolean>((resolve) => {
            if ((window as any).Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            const timeout = window.setTimeout(() => {
                script.remove();
                resolve(false);
            }, 15000);
            script.onload = () => {
                window.clearTimeout(timeout);
                resolve(true);
            };
            script.onerror = () => {
                window.clearTimeout(timeout);
                script.remove();
                resolve(false);
            };
            document.body.appendChild(script);
        });

    //  Buy Now -> create order -> open Razorpay
    const handleBuyNow = async () => {
        if (paymentInProgress.current) return;
        paymentInProgress.current = true;
        paymentVerificationStarted.current = false;
        setPaymentMessage("");
        setPaymentMessageType("info");
        try {
            const orderResponse: any = await createOrder({
                courseId,
                ...((quote?.coupon?.code || appliedCoupon)
                    ? { couponCode: quote?.coupon?.code || appliedCoupon }
                    : {}),
            }).unwrap();
            const order = orderResponse?.data ?? orderResponse;

            if (orderResponse?.success === false || order?.success === false) {
                throw new Error(
                    order?.errors?.[0]?.message ||
                    orderResponse?.errors?.[0]?.message ||
                    order?.message ||
                    orderResponse?.message ||
                    "Could not start checkout. Please try again.",
                );
            }

            if (order?.free) {
                navigate(`/course-practice/${courseId}`, { state: { paymentVerified: true } });
                return;
            }

            const razorpayKeyId = order?.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID;
            if (!razorpayKeyId || !order?.orderId || !Number(order?.amount)) {
                throw new Error("The payment order response is missing its Razorpay key or order details.");
            }

            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                throw new Error("Razorpay Checkout could not load. Check your connection and try again.");
            }

            const options = {
                key: razorpayKeyId,
                amount: order?.amount,
                currency: order?.currency,
                name: "Tiiron AI Powered LMS",
                description: courseTitle,
                order_id: order?.orderId,
                handler: async (checkoutResponse: {
                    razorpay_order_id: string;
                    razorpay_payment_id: string;
                    razorpay_signature: string;
                }) => {
                    paymentVerificationStarted.current = true;
                    try {
                        const verification: any = await verifyPayment(checkoutResponse).unwrap();
                        const verificationResult = verification?.data ?? verification;
                        if (verification?.success === false || verificationResult?.success === false) {
                            throw new Error(verificationResult?.message || verification?.message || "Payment verification failed.");
                        }
                        setPaymentMessageType("success");
                        setPaymentMessage("Payment verified. Opening your course...");
                        navigate(`/course-practice/${courseId}`, { state: { paymentVerified: true } });
                    } catch (error: any) {
                        setPaymentMessageType("error");
                        setPaymentMessage(
                            error?.data?.message || error?.message ||
                            "Payment verification is pending. Please check your enrollment before trying the payment again.",
                        );
                    } finally {
                        paymentInProgress.current = false;
                    }
                },
                prefill: {
                    name: [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(" "),
                    email: currentUser?.email ?? "",
                    contact: "",
                },
                theme: { color: "#4F39F6" },
                modal: {
                    ondismiss: () => {
                        if (!paymentInProgress.current || paymentVerificationStarted.current) return;
                        paymentInProgress.current = false;
                        setPaymentMessageType("info");
                        setPaymentMessage("Checkout closed before payment was confirmed. You can try again when you're ready.");
                    },
                },
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.on("payment.failed", (response: any) => {
                paymentInProgress.current = false;
                setPaymentMessageType("error");
                setPaymentMessage(
                    response?.error?.description ||
                    response?.error?.reason ||
                    "Payment failed. No enrollment was confirmed. Please try another payment method or try again.",
                );
            });
            razorpay.open();
        } catch (error: any) {
            paymentInProgress.current = false;
            setPaymentMessageType("error");
            setPaymentMessage(
                error?.data?.errors?.[0]?.message ||
                error?.data?.message ||
                error?.message ||
                "Could not start checkout. Please try again.",
            );
        }
    };

    return (
        <Box sx={{ bgcolor: "#F7F7F7" }}>
            <Container
                maxWidth="xl"
                sx={{
                    backgroundColor: "transparent",
                    px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
                    // Keep the page's top and bottom breathing room balanced.
                    py: { xs: 3, sm: 4, md: 4 },
                    boxSizing: "border-box",
                }}
            >
                <Box
                    sx={{
                        fontFamily: 'Inter, sans-serif',
                        width: "100%",
                        maxWidth: "1440px",
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ width: "100%", maxWidth: 1120, mb: 3 }}>
                        <BreadCrumb items={[
                            { label: "Home", path: "/", icon: <HomeIcon sx={{ fontSize: 18 }} /> },
                            { label: "Course Glossary", path: `/course-glossary/${courseId}` },
                            { label: "Checkout", path: "#" },
                        ]} />
                        <Typography sx={{ mt: 2, color: "#171827", fontSize: { xs: 25, sm: 30 }, fontWeight: 750, letterSpacing: "-0.04em" }}>Checkout</Typography>
                        <Typography sx={{ mt: 0.5, color: "#73778A", fontSize: 14 }}>Review your course and payment details.</Typography>
                    </Box>

                    {isCourseLoading && <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress sx={{ color: "#4F39F6" }} /></Box>}
                    {isCourseError && <Box sx={{ width: "100%", maxWidth: 1120, mb: 3 }}><Alert severity="error">Couldn't load course details{courseId ? ` for course #${courseId}` : ""}. Please try again.</Alert></Box>}

                    {!isCourseLoading && !isCourseError && (
                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.35fr) minmax(320px, 0.85fr)" }, alignItems: "start", gap: { xs: 2, md: 3 }, width: "100%", maxWidth: 1120 }}>
                            <Box sx={{ display: "grid", gap: 2 }}>
                                <Paper elevation={0} sx={{ display: "flex", alignItems: "center", gap: 2, p: { xs: 2, sm: 2.5 }, border: "1px solid #E8EAF2", borderRadius: 3, boxShadow: "0 8px 24px rgba(25,30,60,.05)" }}>
                                    <Box component="img" src={courseImage} alt={courseTitle} sx={{ width: { xs: 76, sm: 104 }, height: { xs: 76, sm: 104 }, borderRadius: 2, objectFit: "cover", bgcolor: "#F1F2F8", flexShrink: 0 }} />
                                    <Box sx={{ minWidth: 0, flex: 1 }}>
                                        {courseCategory && <Typography sx={{ mb: 0.5, color: "#5B4BDB", fontSize: 12, fontWeight: 700 }}>{courseCategory}</Typography>}
                                        <Typography sx={{ color: "#171827", fontSize: { xs: 16, sm: 19 }, lineHeight: 1.35, fontWeight: 750, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{courseTitle}</Typography>
                                        <Typography sx={{ mt: 0.75, color: "#73778A", fontSize: 12 }}>{totalLectures} lessons <Box component="span" sx={{ px: 0.5 }}>•</Box> {totalHours} hours</Typography>
                                    </Box>
                                    <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                                        {discount > 0 && <Typography sx={{ color: "#9295A3", fontSize: 12, textDecoration: "line-through" }}>{formatCurrency(price)}</Typography>}
                                        <Typography sx={{ color: "#171827", fontSize: { xs: 19, sm: 22 }, fontWeight: 800 }}>{formatCurrency(total)}</Typography>
                                        {discount > 0 && <Typography sx={{ mt: 0.4, px: 1, py: 0.25, borderRadius: 5, bgcolor: "#E9F7E9", color: "#287A32", fontSize: 11, fontWeight: 800 }}>{Math.round((discount / (price || 1)) * 100)}% OFF</Typography>}
                                    </Box>
                                </Paper>

                                <Paper elevation={0} sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 2, border: "1px solid #E8EAF2", borderRadius: 3, bgcolor: "#fff" }}>
                                    <Box sx={{ width: 38, height: 38, display: "grid", placeItems: "center", borderRadius: 2, bgcolor: "#EEF0FF", color: "#5141C8", flexShrink: 0 }}><VerifiedUserOutlinedIcon fontSize="small" /></Box>
                                    <Box>
                                        <Typography sx={{ color: "#222438", fontSize: 14, fontWeight: 750 }}>Learn with confidence</Typography>
                                        <Typography sx={{ color: "#73778A", fontSize: 12 }}>Refund requests are handled under our <Link to="/refund-policy" style={{ color: "#5141C8", fontWeight: 650 }}>refund policy</Link>.</Typography>
                                    </Box>
                                </Paper>

                                <Paper elevation={0} sx={{ p: 2, border: "1px solid #E8EAF2", borderRadius: 3, bgcolor: "#fff" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.25, color: "#25263A" }}><LocalOfferOutlinedIcon sx={{ color: "#5141C8", fontSize: 19 }} /><Typography sx={{ fontSize: 13, fontWeight: 750 }}>Have a coupon code?</Typography></Box>
                                    <Stack direction="row" spacing={1}>
                                        <TextField fullWidth size="small" value={couponCode} onChange={(event) => setCouponCode(event.target.value)} placeholder="Enter coupon code" inputProps={{ "aria-label": "Coupon code" }} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#FAFAFC" } }} />
                                        <Button onClick={() => void handleApplyCoupon()} disabled={isApplyingCoupon || isQuoteLoading} variant="outlined" sx={{ minWidth: 92, borderRadius: 2, borderColor: "#DADCE8", color: "#5141C8", fontWeight: 700, textTransform: "none" }}>{isApplyingCoupon ? <CircularProgress size={18} /> : "Apply"}</Button>
                                    </Stack>
                                    {appliedCoupon && <Typography sx={{ mt: 1, color: "#287A32", fontSize: 12 }}>{appliedCoupon} applied</Typography>}
                                    {couponError && <Alert severity="error" sx={{ mt: 1 }}>{couponError}</Alert>}
                                </Paper>

                            </Box>

                            <Paper elevation={0} sx={{ overflow: "hidden", border: "1px solid #E8EAF2", borderRadius: 3, boxShadow: "0 10px 30px rgba(25,30,60,.07)", position: { md: "sticky" }, top: { md: 24 } }}>
                                <Box sx={{ px: 2.5, py: 1.8, borderBottom: "1px solid #F0F0F4", color: "#222438" }}><Typography sx={{ fontSize: 15, fontWeight: 750 }}>Order summary</Typography></Box>
                                <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 1.75 }}><Typography sx={{ color: "#666A7A", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{courseTitle}</Typography><Typography sx={{ color: "#222438", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>{formatCurrency(price)}</Typography></Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.75 }}><Typography sx={{ color: "#666A7A", fontSize: 13 }}>Discount</Typography><Typography sx={{ color: discount > 0 ? "#37833B" : "#666A7A", fontSize: 13, fontWeight: 700 }}>{discount > 0 ? `−${formatCurrency(discount)}` : formatCurrency(0)}</Typography></Box>
                                    {quote?.coupon?.code && <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.75 }}><Typography sx={{ color: "#666A7A", fontSize: 13 }}>Coupon</Typography><Typography sx={{ color: "#37833B", fontSize: 13, fontWeight: 700 }}>{quote.coupon.code} applied</Typography></Box>}
                                    <Divider sx={{ my: 1.75, borderStyle: "dashed", borderColor: "#DADCE5" }} />
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.75 }}><Typography sx={{ color: "#222438", fontSize: 16, fontWeight: 800 }}>Total payment</Typography><Typography sx={{ color: "#222438", fontSize: 20, fontWeight: 850 }}>{formatCurrency(total)}</Typography></Box>
                                    {discount > 0 && <Typography sx={{ mb: 1.75, color: "#37833B", fontSize: 12, fontWeight: 600 }}>You save {formatCurrency(discount)}</Typography>}
                                    <Button fullWidth variant="contained" disabled={isPlacingOrder || isQuoteLoading || !quote || Boolean(quoteError)} onClick={handleBuyNow} sx={{ py: 1.35, borderRadius: 2, bgcolor: "#5141C8", color: "#fff", textTransform: "none", fontSize: 15, fontWeight: 750, boxShadow: "none", "&:hover": { bgcolor: "#4132AE", boxShadow: "none" } }}>{isPlacingOrder ? "Processing..." : `Pay ${formatCurrency(total)}`}</Button>
                                    {isQuoteLoading && <CircularProgress size={20} sx={{ display: "block", mx: "auto", mt: 1.5 }} />}
                                    {quoteError && <Alert severity="error" sx={{ mt: 1.5 }}>{quoteError}</Alert>}
                                    {paymentMessage && <Alert severity={paymentMessageType} sx={{ mt: 1.5 }}>{paymentMessage}</Alert>}
                                    <Typography sx={{ mt: 1.25, color: "#858898", fontSize: 10, textAlign: "center" }}>Secure payment powered by Razorpay</Typography>
                                </Box>
                            </Paper>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    )
}

interface BreadCrumbItem {
    label: string;
    path?: string;
    icon?: React.ReactNode;
}

export function BreadCrumb({ items }: { items: BreadCrumbItem[] }) {
    return (
        <Breadcrumbs
            separator={<NavigateNextIcon sx={{ fontSize: 18, color: '#94A3B8' }} />}
            aria-label="breadcrumb"
            sx={{
                mb: { xs: 1, md: 1.5 },
                '& .MuiBreadcrumbs-ol': {
                    flexWrap: 'wrap',
                },
            }}
        >
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                if (isLast || !item.path) {
                    return (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                color: '#64748B',
                                fontSize: { xs: '13px', sm: '14px' },
                                fontWeight: 500,
                                cursor: 'default',
                            }}
                        >
                            {item.icon && (
                                <Box sx={{ display: 'flex', alignItems: 'center', color: '#64748B' }}>
                                    {item.icon}
                                </Box>
                            )}
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: 'inherit',
                                    fontWeight: 'inherit',
                                    color: 'inherit',
                                }}
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    );
                }

                return (
                    <Link
                        key={index}
                        to={item.path}
                        style={{ textDecoration: 'none' }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                color: '#4F39F6',
                                fontSize: { xs: '13px', sm: '14px' },
                                fontWeight: 500,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    color: '#3E2DC4',
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            {item.icon && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'inherit',
                                    }}
                                >
                                    {item.icon}
                                </Box>
                            )}
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: 'inherit',
                                    fontWeight: 'inherit',
                                    color: 'inherit',
                                }}
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
}
