import { useState, useEffect } from "react";
import {
  getAddresses,
  createAddress,
  editAddress,
  removeAddress,
} from "../../../api/address";
import { useUserContext } from "../../../context/UserContext";
import styles from '../../../styles/components/pages/UserAddresses.module.scss'

type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
};

const UserAddresses = () => {
  const { user } = useUserContext();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [formData, setFormData] = useState<Partial<Address>>({});
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log("user from the user context this is user addresses----", user)

  useEffect(() => {
    if (user?.id) {
      loadAddresses();
    }
  }, [user?.id]);

  const loadAddresses = async () => {
    if (!user?.id) return; 
    try {
      setLoading(true);
      const fetchedAddresses = await getAddresses(user.id);
      console.log("userAddresses fetched addresses",fetchedAddresses)
      setAddresses(fetchedAddresses || []); 
    } catch (err) {
      setError("Failed to load addresses.");
      console.error("Error loading addresses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrEditAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.street || !formData.city || !formData.state || !formData.postalCode || !formData.country) {
      setError("All fields are required.");
      return;
    }
    if (!user?.id) {
      setError("User not found.");
      return;
    }
    try {
      if (isEditing !== null) {
        // edit address
        const updatedAddress = await editAddress(user.id, isEditing, formData);
        setAddresses((prev) =>
          prev.map((address) => (address.id === isEditing ? updatedAddress : address))
        );
      } else {
        // add new address
        const newAddress = await createAddress(user.id, formData as Address);
        setAddresses((prev) => [...prev, newAddress]);
      }
      resetForm();
    } catch (err) {
      setError("Failed to save address.");
      console.error("Error saving address:", err);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    if (!user?.id) {
      setError("User not found.");
      return;
    }
    try {
      await removeAddress(user.id, addressId);
      await loadAddresses()
      setAddresses((prev) => prev.filter((address) => address.id !== addressId));
    } catch (err) {
      setError("Failed to delete address.");
      console.error("Error deleting address:", err);
    }
  };

  const handleEditClick = (address: Address) => {
    setFormData(address);
    setIsEditing(address.id);
  };

  const resetForm = () => {
    setFormData({});
    setIsEditing(null);
    setError("");
  };

  if (!user) {
    return <p className="text-red-500">User not logged in.</p>;
  }

  if (loading) return <p>Loading addresses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className={styles["addresses-container"]}>
  <h1 className={styles["addresses-heading"]}>Your Addresses</h1>

  {/* Form for Adding/Editing Addresses */}
  <form onSubmit={handleAddOrEditAddress} className="address-form">
    <input
      type="text"
      placeholder="Street"
      value={formData.street || ""}
      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
      className={styles["input-field"]}
    />
    <input
      type="text"
      placeholder="City"
      value={formData.city || ""}
      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      className={styles["input-field"]}
    />
    <input
      type="text"
      placeholder="State"
      value={formData.state || ""}
      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
      className={styles["input-field"]}
    />
    <input
      type="text"
      placeholder="Postal Code"
      value={formData.postalCode || ""}
      onChange={(e) =>
        setFormData({ ...formData, postalCode: e.target.value })
      }
      className={styles["input-field"]}
    />
    <input
      type="text"
      placeholder="Country"
      value={formData.country || ""}
      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
      className={styles["input-field"]}
    />
    <label className={styles["checkbox-container"]}>
      <input
        type="checkbox"
        className={styles['setasprimary']}
        checked={formData.isPrimary || false}
        onChange={(e) =>
          setFormData({ ...formData, isPrimary: e.target.checked })
        }
      />
      <span >Set as Primary</span>
    </label>
    <button type="submit" className={styles["primary-button"]}>
      {isEditing !== null ? "Update Address" : "Add Address"}
    </button>
    {isEditing !== null && (
      <button type="button" onClick={resetForm} className={styles["secondary-button"]}>
        Cancel
      </button>
    )}
  </form>

  {/* List of Addresses */}
  <ul className={styles["address-list"]}>
    {addresses.length > 0 ? (
      addresses.map((address) => (
        <li key={address.id} className={styles["address-item"]}>
          <p>
            {address.street}, {address.city}, {address.state},
            {address.postalCode}, {address.country}
          </p>
          <p>{address.isPrimary ? "Primary" : "Secondary"}</p>
          <div className={styles["button-group"]}>
            <button
              onClick={() => handleEditClick(address)}
              className={styles["edit-button"]}
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteAddress(address.id)}
              className={styles["delete-button"]}
            >
              Delete
            </button>
          </div>
        </li>
      ))
    ) : (
      <p>No addresses found.</p>
    )}
  </ul>
</div>

  );
};

export default UserAddresses;


// adresses is visible only after reloading the page -- bug fix