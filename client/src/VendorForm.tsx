import React from 'react';

interface VendorFormProps {
  insertedAmount: number;
  handleCoinClick: (amount: number) => void;
  handleResetClick: () => void;
}

const VendorForm: React.FC<VendorFormProps> = ({ insertedAmount, handleCoinClick, handleResetClick }) => {
  return (
    <div className="vendor-form">
      <h2>Insert coin</h2>
      <div className="coin-buttons">
        {[0.05, 0.10, 0.20, 0.50, 1].map(amount => (
          <button key={amount} onClick={() => handleCoinClick(amount)}>
            {amount === 100 ? '$1' : `${amount}$`}
          </button>
        ))}
      </div>
      <p>Inserted Amount: ${insertedAmount.toFixed(2)}</p>
      <button onClick={handleResetClick}>Reset</button>
    </div>
  );
};

export default VendorForm;