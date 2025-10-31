import {
  Box,
  Typography,
  Modal,
  Divider,
  Button,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

import {
  useInitiateCheckoutMutation,
  useGetCartQuery,
  useRemoveFromCartServerMutation,
  ICartItem,
  SingleCheckoutRequest,
} from "../../../features/course/api/courseApi";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

// --- Single Cart Item Component ---
interface CartItemProps {
  item: ICartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const [removeFromCartServer, { isLoading: isRemoving }] =
    useRemoveFromCartServerMutation();

  const title = item.course.title;
  const price = item.course.price ?? 0;
  const thumbnail = item.course.image;
  const cartItemId = item.id;

  const handleRemove = async () => {
    try {
      await removeFromCartServer({ cartItemId: cartItemId }).unwrap();
    } catch (error) {
      console.error("Failed to remove item from server cart:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", py: 1.5, gap: 2 }}>
      <img
        src={thumbnail || "placeholder-url"}
        alt={title}
        style={{
          width: 60,
          height: 60,
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" fontWeight="bold" noWrap>
          {title}
        </Typography>
        <Typography variant="subtitle2" color="primary.main" sx={{ mt: 0.5 }}>
          ${price.toFixed(2)}
        </Typography>
      </Box>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={handleRemove}
        disabled={isRemoving}
      >
        {isRemoving ? (
          <CircularProgress size={20} color="error" />
        ) : (
          <DeleteIcon color="error" />
        )}
      </IconButton>
    </Box>
  );
};

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const {
    data: cartData,
    isFetching: isCartFetching,
    isError: isCartError,
  } = useGetCartQuery(undefined, {
    skip: !isOpen, // Only fetch when modal is open
  });

  const cartItems = cartData?.data?.items || [];
  const cartTotal = cartData?.data?.total || 0;
  const isCartEmpty = cartItems.length === 0;

  const [initiateCheckout, { isLoading: isCheckingOut }] =
    useInitiateCheckoutMutation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, SetSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // --- LOOPING CHECKOUT HANDLER ---
  const handleCheckout = async () => {
    if (isCartEmpty || isCheckingOut || isCartFetching) return;

    SetSnackbarMessage("Initiating checkout process...");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);

    // 1. Get all Course IDs from the server cart items
    const courseIds = cartItems.map((item) => item.courseId);

    const payload: SingleCheckoutRequest = {
      courseIds: courseIds,
    };

    const isFree = cartTotal === 0;

    try {
      const response = await initiateCheckout(payload as any).unwrap();

      // SUCCESS HANDLING
      if (response.success) {
        if (isFree) {
          SetSnackbarMessage(
            `Successfully enrolled in ${courseIds.length} FREE course(s)!`
          );
          setSnackbarSeverity("success");
          setTimeout(onClose, 2000);
        } else if (response.paymentUrl) {
          SetSnackbarMessage("Redirecting to payment gateway...");
          setSnackbarSeverity("info");
          // TODO: Redirect the user to response.paymentUrl
          // window.location.href = response.paymentUrl; // Uncomment this when ready
        } else {
          SetSnackbarMessage("Checkout initiated successfully!");
          setSnackbarSeverity("success");
          setTimeout(onClose, 3000);
        }
      }
    } catch (error: any) {
      let errorMessage = "Checkout failed due to a server or network error.";
      let severity: "success" | "error" | "info" | "warning" = "error";

      const serverMessage =
        error?.data?.errors?.[0]?.message || error?.data?.message;

      if (serverMessage) {
        if (serverMessage.toLowerCase().includes("enrolled")) {
          errorMessage =
            "You are already enrolled in one or more of these courses.";
          severity = "warning";
        } else {
          errorMessage = serverMessage;
          severity = "error";
        }
      }

      setSnackbarSeverity(severity);
      SetSnackbarMessage(errorMessage);
      setSnackbarOpen(true);

      console.error("Checkout Error:", error);
    }
  };

  const isContentLoading = isCartFetching && !cartData;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="cart-modal-title"
      aria-describedby="cart-modal-description"
    >
      <Box sx={style}>
        {/* Modal Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            id="cart-modal-title"
            variant="h5"
            component="h2"
            fontWeight="bold"
          >
            🛒 Your Cart ({cartItems.length}{" "}
            {cartItems.length === 1 ? "Item" : "Items"})
          </Typography>
          <IconButton onClick={onClose} disabled={isCheckingOut}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Cart Items List */}
        {isCartError ? (
          <Typography color="error" sx={{ py: 3, textAlign: "center" }}>
            Error loading cart. Please try again.
          </Typography>
        ) : isContentLoading ? (
          <Box sx={{ py: 3, textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : isCartEmpty ? (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ py: 3, textAlign: "center" }}
          >
            Your cart is empty! Add some courses.
          </Typography>
        ) : (
          <>
            <Box sx={{ mb: 2 }}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </Box>

            <Divider sx={{ mt: 2, mb: 2 }} />

            {/* Total and Checkout */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Total:</Typography>
              <Typography
                variant="h5"
                color={cartTotal > 0 ? "error.main" : "success.main"}
                fontWeight="bold"
              >
                {cartTotal === 0 ? "FREE" : `$${cartTotal.toFixed(2)}`}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 1 }}
              onClick={handleCheckout}
              disabled={isCheckingOut || isCartEmpty}
            >
              {isCheckingOut ? (
                <CircularProgress size={24} color="inherit" />
              ) : cartTotal === 0 ? (
                "Enroll Now (FREE)"
              ) : (
                "Proceed to Checkout"
              )}
            </Button>
          </>
        )}

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};
