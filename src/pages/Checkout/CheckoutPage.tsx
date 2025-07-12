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
} from '@mui/material';
import { Link } from "react-router-dom"

export default function CheckoutPage() {
    return (
        <Box
            paddingInline={{ xs: "16px", sm: "40px", md: "80px" }}
            bgcolor={"#fff"}
        >
            <Box
                sx={{
                    p: { xs: 2, md: 4 },
                    mx: "auto",
                    fontFamily: 'Inter, sans-serif',
                    width: "100%",
                    display:"grid",
                    justifyContent:"center"
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        mb: 4,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: "25px",
                    }}
                >
                    <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Checkout Page</Typography>
                    <BreadCrumb items={[{ label: "Details" }, { label: "Checkout", path: "#" }]} />
                </Box>

                {/* Form and Sidebar */}

                <Box
                    sx={{
                        display: "flex",
                        gap: "40px",
                        flexDirection: {
                            xs: 'column',
                            md: 'row',
                        },
                    }}
                >
                    {/* Left: Form */}
                    <Box
                        component="form"
                        sx={{
                            border: '1px solid #e2e8f0',
                            borderRadius: 4,
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                            width: { xs: "100%", md: "60%", lg: "820px" },
                            maxWidth: "100%",
                        }}
                    >
                        {/* Country & State */}
                        <Box
                            sx={{
                                display: 'grid',
                                gap: "17px",
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: '1fr 1fr',
                                },
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: '18px', mb: 0.5 }}>Country</Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter Country"
                                    size="medium"
                                    variant="outlined"
                                    InputProps={{
                                        sx: {
                                            borderRadius: 2,
                                            bgcolor: '#fff',
                                        },
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: '18px', mb: 0.5 }}>State/Union Territory</Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter State"
                                    size="medium"
                                    variant="outlined"
                                    InputProps={{
                                        sx: {
                                            borderRadius: 2,
                                            bgcolor: '#fff',
                                        },
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Payment */}
                        <FormControl component="fieldset" sx={{ width: '100%', bgcolor: '#f8fafc' }}>
                            <FormLabel component="legend" sx={{ fontWeight: 600, fontSize: '18px', color: '#0f172a', mb: 2 }}>
                                Payment Method
                            </FormLabel>

                            {/* Card Option */}
                            <Paper
                                sx={{
                                    p: 2,
                                    bgcolor: '#F8FAFC',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    border: 'none',
                                    boxShadow: 'none',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                }}
                            >
                                <Box display="flex" alignItems="center" gap={1.5}>
                                    <Radio
                                        defaultChecked
                                        value="card"
                                        sx={{
                                            p: 0.5,
                                            color: '#7c3aed',
                                            '&.Mui-checked': {
                                                color: '#7c3aed',
                                            },
                                        }}
                                    />
                                    <Typography sx={{ fontWeight: 600, fontSize: '18px', color: '#0f172a' }}>
                                        Credit/Debit Card
                                    </Typography>
                                </Box>
                                <Box
                                    component="img"
                                    src="src/assets/images/visa.png"
                                    alt="Visa/Mastercard"
                                    height={28.5}
                                    width={72.25}
                                    sx={{ ml: { xs: 0, sm: 2 } }}
                                />
                            </Paper>

                            {/* Card Fields */}
                            <Stack spacing={2} px={1}>
                                <Box>
                                    <Typography sx={{ fontSize: '0.75rem', mb: 0.5 }}>Name of Card</Typography>
                                    <TextField fullWidth placeholder="Name of card" size="medium" />
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: '0.75rem', mb: 0.5 }}>Card Number</Typography>
                                    <TextField fullWidth placeholder="Card Number" size="medium" />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            xs: '1fr',
                                            sm: '1fr 1fr',
                                        },
                                        gap: 2,
                                    }}
                                >
                                    <Box>
                                        <Typography sx={{ fontSize: '0.75rem', mb: 0.5 }}>Expiry Date</Typography>
                                        <TextField fullWidth placeholder="MM/YY" size="medium" />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '0.75rem', mb: 0.5 }}>CVC/CVV</Typography>
                                        <TextField fullWidth placeholder="CVC" size="medium" />
                                    </Box>
                                </Box>
                            </Stack>

                            {/* PayPal Option */}
                            <Paper
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    bgcolor: '#f8fafc',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    border: 'none',
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
                                            color: '#7c3aed',
                                            '&.Mui-checked': {
                                                color: '#7c3aed',
                                            },
                                        }}
                                    />
                                    <Typography sx={{ fontWeight: 600, fontSize: '18px', color: '#0f172a' }}>
                                        PayPal
                                    </Typography>
                                </Box>
                                <Box
                                    component="img"
                                    src="src/assets/icons/paypal.svg"
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
                            width: { xs: "100%", md: "40%", lg: "400px" },
                            display: "grid",
                            gap: "16px",
                        }}
                    >
                        {/* Order Header */}
                        <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
                            Order Details
                        </Typography>

                        {/* Course Card */}
                        <Paper
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                p: 1.5,
                                borderRadius: 2,
                                maxWidth: "100%",
                                bgcolor: "#F8FAFC",
                                gap: 2,
                            }}
                        >
                            <Box
                                component="img"
                                src="src/assets/images/chekoutPage_image.png"
                                alt="Course"
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
                                    bgcolor: "#F8FAFC",
                                }}
                            >
                                <Typography sx={{ fontSize: '14px', color: '#6A42AB', fontWeight: 500 }}>
                                    Design
                                </Typography>
                                <Typography sx={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.3 }}>
                                    Introduction to User Experience Design
                                </Typography>
                                <Typography sx={{ fontSize: '14px', color: '#64748b' }}>
                                    155 Lectures · 22 Total Hours
                                </Typography>
                                <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>
                                    $45.00
                                </Typography>
                            </Box>
                        </Paper>

                        {/* Apply Coupon */}
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                borderRadius: 2,
                                cursor: 'pointer',
                                bgcolor: "#F8FAFC",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#0f172a',
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                }}
                            >
                                <img src="src/assets/icons/coupon.svg" alt="" />
                                APPLY COUPON CODE
                            </Typography>
                        </Paper>

                        {/* Price Summary */}
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor: "#F8FAFC",
                            }}
                        >
                            <Box display="flex" justifyContent="space-between" mb={"16px"}>
                                <Typography sx={{ fontSize: '16px' }}>Price</Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>$300.00</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mb={"16px"}>
                                <Typography sx={{ fontSize: '16px' }}>Discount</Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>- $10.00</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mb={"16px"}>
                                <Typography sx={{ fontSize: '16px' }}>Tax</Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>$20.00</Typography>
                            </Box>

                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="space-between">
                                <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>Total</Typography>
                                <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>$290.00</Typography>
                            </Box>
                        </Paper>

                        {/* Checkout Button */}
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: '#0f172a',
                                color: '#fff',
                                textTransform: 'none',
                                borderRadius: 2,
                                fontWeight: 500,
                                py: 1.25,
                                fontSize: '0.9rem',
                                '&:hover': {
                                    bgcolor: '#1e293b',
                                },
                            }}
                        >
                            Proceed to Checkout
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export function BreadCrumb({ items }: {
    items: {
        label: string;
        path?: string;
    }[];
}) {
    return <nav aria-label="breadcrumb">
        <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
            {items.map((item, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', fontSize: "14px" }}>
                    {item?.path ? (
                        <Link to={item?.path} style={{ textDecoration: 'none', color: '#702DFF' }}>
                            {item?.label}
                        </Link>
                    ) : (
                        <span>{item?.label}</span>
                    )}
                    {index < items.length - 1 && <img src="src/assets/icons/right_arrow.png" style={{ margin: '0 8px' }} />}
                </li>
            ))}
        </ol>
    </nav>
}