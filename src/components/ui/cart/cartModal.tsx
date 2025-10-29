import {
  Box,
  Typography,
  Modal,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";

import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
} from "../../../slices/cartSlice"; 

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
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
}

const CartItem: React.FC<CartItemProps> = ({ id, title, price, thumbnail }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(id));
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
      <IconButton edge="end" aria-label="delete" onClick={handleRemove}>
        <DeleteIcon color="error" />
      </IconButton>
    </Box>
  );
};

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const cartItems = useSelector(selectCartItems); // Cart items from Redux
  const cartTotal = useSelector(selectCartTotal); // Cart total from Redux
  const isCartEmpty = cartItems.length === 0;

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
            Your Cart ({cartItems.length}{" "}
            {cartItems.length === 1 ? "Item" : "Items"})
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Cart Items List */}
        {isCartEmpty ? (
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
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  thumbnail={item.thumbnail}
                />
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
              <Typography variant="h5" color="success.main" fontWeight="bold">
                ${cartTotal}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 1 }}
              // onClick={() => console.log('Navigate to Checkout')} // Add actual checkout logic/navigation here
            >
              Proceed to Checkout
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};
