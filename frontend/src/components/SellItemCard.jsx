

function SellItemCard({ onClick }) {
  return (
    <div className="sell-item-card" onClick={onClick}>
      <div className="sell-item-content">
        <h2>➕ Sell an Item</h2>
        <p>Click here to list a product for sale</p>
      </div>
    </div>
  );
}

export default SellItemCard;
