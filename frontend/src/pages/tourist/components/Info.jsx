import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Info({ cart, currency, exchangeRate, promo }) {
  const totalPrice = cart
    .reduce((total, item) => total + item.price * exchangeRate, 0)
    .toFixed(2);

  const discountAmount = promo ? (totalPrice * (promo / 100)).toFixed(2) : 0;
  const discountedTotalPrice = (totalPrice - discountAmount).toFixed(2);

  return (
    <React.Fragment>
      <List disablePadding>
        {cart.map((item) => (
          <ListItem key={item.product._id} sx={{ py: 2, px: 0, display: 'flex', alignItems: 'center' }}>
            <img
              src={item.product.picture}
              alt=""
              style={{ width: "70px", height: "70px", marginRight: '16px' }}
            />
            <ListItemText
              sx={{ mr: 2 }}
              primary={item.product.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium', color: "#ffffff" }}>
              {currency} {(item.price * exchangeRate).toFixed(2)}
            </Typography>
          </ListItem>
        ))}

        {/* Summary section */}
        <Box sx={{ mt: 2, borderTop: '1px solid rgba(255,255,255,0.1)', pt: 2 }}>
          <ListItem sx={{ px: 0 }}>
            <ListItemText primary="Subtotal" />
            <Typography sx={{ color: '#ffffff' }}>
              {currency} {totalPrice}
            </Typography>
          </ListItem>

          {promo > 0 && (
            <ListItem sx={{ px: 0, color: '#4CAF50' }}>
              <ListItemText primary={`Discount (${promo}%)`} />
              <Typography sx={{ color: '#4CAF50' }}>
                -{currency} {discountAmount}
              </Typography>
            </ListItem>
          )}

          <ListItem sx={{ px: 0, py: 2 }}>
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                  Total
                </Typography>
              }
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
              {currency} {discountedTotalPrice}
            </Typography>
          </ListItem>
        </Box>
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  currency: PropTypes.string.isRequired,
  exchangeRate: PropTypes.number.isRequired,
  promo: PropTypes.number
};

export default Info;