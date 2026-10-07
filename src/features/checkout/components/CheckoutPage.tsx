import Navbar from '../../../components/ui/Navbar';
import {
    Box,
    Typography,
    TextField,
    Radio,
    FormControl,
    FormLabel,
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
import { useEffect, useState } from "react";
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

export default function CheckoutPage() {
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState("");
    const [quote, setQuote] = useState<any>(null);
    const [couponError, setCouponError] = useState("");
    const [quoteError, setQuoteError] = useState("");
    const [paymentMessage, setPaymentMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { data: cartData } = useGetCartQuery();

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

    // 🔴 Dynamic fetch — hits GET /course/:id via checkoutapi.ts
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
    const courseTitle = course?.title ?? course?.name ?? "—";
    const courseCategory = course?.category?.name ?? course?.category ?? course?.tag ?? "";
    const courseImage = course?.thumbnail ?? course?.image ?? "images/chekoutPage_image.png";
    const totalLectures = course?.totalLectures ?? course?.lecturesCount ?? course?.lectures ?? 0;
    const totalHours = course?.totalHours ?? course?.duration ?? 0;

    const price = Number(quote?.originalPrice ?? 0);
    const discount = Number(quote?.discountAmount ?? 0);
    const total = Number(quote?.finalPrice ?? 0);

    const formatCurrency = (value: number) =>
        `₹${(isNaN(value) ? 0 : value).toFixed(2)}`;

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

    // 🔴 Load Razorpay checkout.js
    const loadRazorpayScript = () =>
        new Promise((resolve) => {
            if ((window as any).Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });

    // 🔴 Buy Now -> create order -> open Razorpay
    const handleBuyNow = async () => {
        try {
            const orderResponse: any = await createOrder({
                courseId,
                ...((quote?.coupon?.code || appliedCoupon)
                    ? { couponCode: quote?.coupon?.code || appliedCoupon }
                    : {}),
            }).unwrap();
            const order = orderResponse?.data ?? orderResponse;

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
                name: "Tiiron Academy",
                description: courseTitle,
                order_id: order?.orderId,
                handler: async (checkoutResponse: {
                    razorpay_order_id: string;
                    razorpay_payment_id: string;
                    razorpay_signature: string;
                }) => {
                    try {
                        const verification: any = await verifyPayment(checkoutResponse).unwrap();
                        if (verification?.success === false) {
                            throw new Error(verification?.message || "Payment verification failed.");
                        }
                        navigate(`/course-practice/${courseId}`, { state: { paymentVerified: true } });
                    } catch (error: any) {
                        setPaymentMessage(
                            error?.data?.message || error?.message ||
                            "We couldn't verify this payment. Please contact support before trying again.",
                        );
                    }
                },
                prefill: { name: "", email: "", contact: "" },
                theme: { color: "#4F39F6" },
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
        } catch (error: any) {
            setPaymentMessage(error?.data?.message || error?.message || "Could not start checkout. Please try again.");
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#F7F7F7" }}>
            <Navbar />
            <Container
                maxWidth="xl"
                sx={{
                    backgroundColor: "transparent",
                    minHeight: "calc(100vh - 72px)",
                    px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
                    pt: 0,
                    pb: { xs: 3, md: 4, lg: 5 },
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
                    {/* Header */}
                    <Box
                        sx={{
                            mb: { xs: 4, md: 6 },
                            width: "100%",
                            maxWidth: { xs: "100%", md: "1280px" },
                        }}
                    >
                        <BreadCrumb
                            items={[
                                { label: "Home", path: "/", icon: <HomeIcon sx={{ fontSize: 18 }} /> },
                                { label: "Course Glossary", path: `/course-glossary/${courseId}` },
                                { label: "Checkout", path: "#" }
                            ]}
                        />
                        <Typography
                            sx={{
                                fontSize: { xs: '20px', md: '28px', lg: '32px' },
                                fontWeight: 700,
                                color: '#0F172A',
                                mt: { xs: 2, md: 3 }
                            }}
                        >
                            Checkout Page
                        </Typography>
                    </Box>

                    {/* Loading / Error states */}
                    {isCourseLoading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                            <CircularProgress sx={{ color: '#4F39F6' }} />
                        </Box>
                    )}

                    {isCourseError && (
                        <Box sx={{ width: "100%", maxWidth: { xs: "100%", md: "1280px" }, mb: 3 }}>
                            <Alert severity="error">
                                Couldn't load course details{courseId ? ` for course #${courseId}` : ""}. Please try again.
                            </Alert>
                        </Box>
                    )}

                    {!isCourseLoading && !isCourseError && (
                        <Box
                            sx={{
                                display: "flex",
                                gap: { xs: 3, md: 5 },
                                flexDirection: {
                                    xs: 'column',
                                    md: 'row',
                                },
                                alignItems: { xs: 'stretch', md: 'flex-start' },
                                justifyContent: "center",
                                width: "100%",
                                maxWidth: { xs: "100%", md: "1280px" },
                            }}
                        >
                            {/* Left: Form */}
                            <Box
                                component="form"
                                sx={{
                                    bgcolor: 'white',
                                    border: '1px solid #E2E8F0',
                                    borderRadius: 3,
                                    p: { xs: 3, md: 4, lg: 5 },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: { xs: 3, md: 4 },
                                    width: { xs: "100%", md: "calc(60% - 20px)", lg: "820px" },
                                    maxWidth: "100%",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    flexShrink: 0,
                                }}
                            >
                                {/* Country & State */}
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gap: { xs: 2, md: 3 },
                                        gridTemplateColumns: {
                                            xs: '1fr',
                                            sm: '1fr 1fr',
                                        },
                                    }}
                                >
                                    <Box>
                                        <Typography sx={{ fontWeight: 600, fontSize: { xs: '16px', md: '18px' }, mb: 1.5, color: '#0F172A' }}>
                                            Country
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Country"
                                            size="medium"
                                            variant="outlined"
                                            InputProps={{
                                                sx: {
                                                    borderRadius: 2,
                                                    bgcolor: '#fff',
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#E2E8F0',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#CBD5E1',
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#4F39F6',
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 600, fontSize: { xs: '16px', md: '18px' }, mb: 1.5, color: '#0F172A' }}>
                                            State/Union Territory
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter State"
                                            size="medium"
                                            variant="outlined"
                                            InputProps={{
                                                sx: {
                                                    borderRadius: 2,
                                                    bgcolor: '#fff',
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#E2E8F0',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#CBD5E1',
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#4F39F6',
                                                    },
                                                },
                                            }}
                                        />
                                    </Box>
                                </Box>

                                {/* Payment */}
                                <FormControl component="fieldset" sx={{ width: '100%', bgcolor: '#F8FAFC', borderRadius: 2, p: { xs: 2, md: 3 } }}>
                                    <FormLabel component="legend" sx={{ fontWeight: 600, fontSize: { xs: '16px', md: '18px' }, color: '#0F172A', mb: 3 }}>
                                        Payment Method
                                    </FormLabel>

                                    {/* Card Option */}
                                    <Paper
                                        sx={{
                                            p: 2.5,
                                            bgcolor: '#fff',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            border: '1px solid #E2E8F0',
                                            borderRadius: 2,
                                            boxShadow: 'none',
                                            flexWrap: 'wrap',
                                            gap: 1,
                                            mb: 3,
                                        }}
                                    >
                                        <Box display="flex" alignItems="center" gap={1.5}>
                                            <Radio
                                                defaultChecked
                                                value="card"
                                                sx={{
                                                    p: 0.5,
                                                    color: '#4F39F6',
                                                    '&.Mui-checked': {
                                                        color: '#4F39F6',
                                                    },
                                                }}
                                            />
                                            <Typography sx={{ fontWeight: 600, fontSize: { xs: '16px', md: '18px' }, color: '#0F172A' }}>
                                                Credit/Debit Card
                                            </Typography>
                                        </Box>
                                        <Box
                                            component="img"
                                            src="images/visa.png"
                                            alt="Visa/Mastercard"
                                            height={28.5}
                                            width={72.25}
                                            sx={{ ml: { xs: 0, sm: 2 } }}
                                        />
                                    </Paper>

                                    {/* Card Fields */}
                                    <Stack spacing={2.5} px={0.5}>
                                        <Box>
                                            <Typography sx={{ fontSize: '14px', mb: 1, color: '#334155', fontWeight: 500 }}>
                                                Name of Card
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                placeholder="Name of card"
                                                size="medium"
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: 2,
                                                        bgcolor: '#fff',
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#E2E8F0',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#CBD5E1',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#4F39F6',
                                                        },
                                                    },
                                                }}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontSize: '14px', mb: 1, color: '#334155', fontWeight: 500 }}>
                                                Card Number
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                placeholder="Card Number"
                                                size="medium"
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: 2,
                                                        bgcolor: '#fff',
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#E2E8F0',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#CBD5E1',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#4F39F6',
                                                        },
                                                    },
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: {
                                                    xs: '1fr',
                                                    sm: '1fr 1fr',
                                                },
                                                gap: 2.5,
                                            }}
                                        >
                                            <Box>
                                                <Typography sx={{ fontSize: '14px', mb: 1, color: '#334155', fontWeight: 500 }}>
                                                    Expiry Date
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="MM/YY"
                                                    size="medium"
                                                    InputProps={{
                                                        sx: {
                                                            borderRadius: 2,
                                                            bgcolor: '#fff',
                                                            '& .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#E2E8F0',
                                                            },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#CBD5E1',
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#4F39F6',
                                                            },
                                                        },
                                                    }}
                                                />
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontSize: '14px', mb: 1, color: '#334155', fontWeight: 500 }}>
                                                    CVC/CVV
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="CVC"
                                                    size="medium"
                                                    InputProps={{
                                                        sx: {
                                                            borderRadius: 2,
                                                            bgcolor: '#fff',
                                                            '& .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#E2E8F0',
                                                            },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#CBD5E1',
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#4F39F6',
                                                            },
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Stack>

                                    {/* PayPal Option */}
                                    <Paper
                                        sx={{
                                            mt: 3,
                                            p: 2.5,
                                            bgcolor: '#fff',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            border: '1px solid #E2E8F0',
                                            borderRadius: 2,
                                            boxShadow: 'none',
                                            flexWrap: 'wrap',
                                            gap: 1,
                                        }}
                                    >
                                        <Box display="flex" alignItems="center" gap={1.5}>
                                            <Radio
                                                value="paypal"
                                                sx={{
                                                    p: 0.5,
                                                    color: '#4F39F6',
                                                    '&.Mui-checked': {
                                                        color: '#4F39F6',
                                                    },
                                                }}
                                            />
                                            <Typography sx={{ fontWeight: 600, fontSize: { xs: '16px', md: '18px' }, color: '#0F172A' }}>
                                                PayPal
                                            </Typography>
                                        </Box>
                                        <Box
                                            component="img"
                                            src="icons/paypal.svg"
                                            alt="PayPal logo"
                                            height={28.5}
                                            width={72.25}
                                            sx={{ ml: { xs: 0, sm: 2 } }}
                                        />
                                    </Paper>
                                </FormControl>
                            </Box>

                            {/* Right: Sidebar */}
                            <Box
                                sx={{
                                    fontFamily: 'Inter, sans-serif',
                                    width: { xs: "100%", md: "calc(40% - 20px)", lg: "400px" },
                                    display: "grid",
                                    gap: { xs: 2.5, md: 3 },
                                    flexShrink: 0,
                                }}
                            >
                                {/* Order Header */}
                                <Typography sx={{ fontWeight: 700, fontSize: { xs: '18px', md: '22px' }, color: '#0F172A' }}>
                                    Order Details
                                </Typography>

                                {/* Course Card — now dynamic */}
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        p: { xs: 2, md: 2.5 },
                                        borderRadius: 2,
                                        maxWidth: "100%",
                                        bgcolor: "#fff",
                                        border: '1px solid #E2E8F0',
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                        gap: 2,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={courseImage}
                                        alt={courseTitle}
                                        sx={{
                                            width: 131,
                                            height: 131,
                                            borderRadius: 1,
                                            objectFit: 'cover',
                                            my: "auto",
                                            bgcolor: "#F8FAFC"
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            gap: 1,
                                        }}
                                    >
                                        {courseCategory && (
                                            <Typography sx={{ fontSize: '14px', color: '#4F39F6', fontWeight: 600 }}>
                                                {courseCategory}
                                            </Typography>
                                        )}
                                        <Typography sx={{ fontSize: { xs: '16px', md: '18px' }, fontWeight: 600, lineHeight: 1.4, color: '#0F172A' }}>
                                            {courseTitle}
                                        </Typography>
                                        <Typography sx={{ fontSize: '14px', color: '#64748B', fontWeight: 400 }}>
                                            {totalLectures} Lectures · {totalHours} Total Hours
                                        </Typography>
                                        <Typography sx={{ fontSize: { xs: '18px', md: '20px' }, fontWeight: 700, color: '#0F172A' }}>
                                            {formatCurrency(price)}
                                        </Typography>
                                    </Box>
                                </Paper>

                                {/* Apply Coupon */}
                                <Paper variant="outlined" sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 2, bgcolor: "#fff" }}>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', mb: 1.5 }}>
                                        APPLY COUPON CODE
                                    </Typography>
                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={couponCode}
                                            onChange={(event) => setCouponCode(event.target.value)}
                                            placeholder="Enter coupon code"
                                            inputProps={{ "aria-label": "Coupon code" }}
                                        />
                                        <Button
                                            variant="outlined"
                                            onClick={() => void handleApplyCoupon()}
                                            disabled={isApplyingCoupon || isQuoteLoading}
                                        >
                                            {isApplyingCoupon ? <CircularProgress size={18} /> : "Apply"}
                                        </Button>
                                    </Stack>
                                    {appliedCoupon && <Typography variant="caption" color="success.main">{appliedCoupon} applied</Typography>}
                                    {couponError && <Alert severity="error" sx={{ mt: 1 }}>{couponError}</Alert>}
                                </Paper>

                                {/* Price Summary — now dynamic */}
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: { xs: 2.5, md: 3 },
                                        borderRadius: 2,
                                        bgcolor: "#fff",
                                        border: '1px solid #E2E8F0',
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    <Box display="flex" justifyContent="space-between" mb={2.5}>
                                        <Typography sx={{ fontSize: '16px', color: '#64748B', fontWeight: 400 }}>Price</Typography>
                                        <Typography sx={{ fontWeight: 600, fontSize: "18px", color: '#0F172A' }}>{formatCurrency(price)}</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" mb={2.5}>
                                        <Typography sx={{ fontSize: '16px', color: '#64748B', fontWeight: 400 }}>Discount</Typography>
                                        <Typography sx={{ fontWeight: 600, fontSize: "18px", color: '#10B981' }}>
                                            {discount > 0 ? `- ${formatCurrency(discount)}` : formatCurrency(0)}
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ my: 2.5, borderColor: '#E2E8F0' }} />

                                    <Box display="flex" justifyContent="space-between">
                                        <Typography sx={{ fontSize: { xs: '18px', md: '20px' }, fontWeight: 700, color: '#0F172A' }}>Total</Typography>
                                        <Typography sx={{ fontSize: { xs: '18px', md: '20px' }, fontWeight: 700, color: '#0F172A' }}>{formatCurrency(total)}</Typography>
                                    </Box>
                                </Paper>

                                {/* Checkout Button */}
                                <Button
                                    fullWidth
                                    variant="contained"
                                    disabled={isPlacingOrder || isQuoteLoading || !quote || Boolean(quoteError)}
                                    onClick={handleBuyNow}
                                    sx={{
                                        bgcolor: '#0F172A',
                                        color: '#fff',
                                        textTransform: 'none',
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        py: { xs: 1.5, md: 1.75 },
                                        fontSize: { xs: '16px', md: '18px' },
                                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            bgcolor: '#1E293B',
                                            boxShadow: '0 6px 16px rgba(15, 23, 42, 0.3)',
                                            transform: 'translateY(-1px)',
                                        },
                                    }}
                                >
                                    {isPlacingOrder ? "Processing..." : "Buy Now"}
                                </Button>
                                {isQuoteLoading && <CircularProgress size={20} sx={{ mx: "auto" }} />}
                                {quoteError && <Alert severity="error">{quoteError}</Alert>}
                                {paymentMessage && <Alert severity="info">{paymentMessage}</Alert>}
                            </Box>
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
