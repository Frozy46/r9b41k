import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHeader } from "../../components/Context/HeaderContext";
import editButton from "../../assets/edit.svg";
import customerInfo from "../../assets/customer-info.svg";
import defaultAvatar from "../../assets/default-avatar.png";
import EditCustomerModal from "../../components/EditCustomerModal/EditCustomerModal";
import "./Customers.scss";
import { updateCustomer } from "../../redux/customerSlice";

const Customers = () => {
  const allCustomers = useSelector((state) => state.customers.customers);
  const [displayedCustomers, setDisplayedCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [filterType, setFilterType] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { setHeaderInfo } = useHeader();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Инициализация состояния из localStorage
  useEffect(() => {
    const savedDisplayedCustomers = localStorage.getItem("displayedCustomers");
    const savedSortOrder = localStorage.getItem("sortOrder");
    const savedFilterType = localStorage.getItem("filterType");
    const savedPage = localStorage.getItem("page");

    if (savedDisplayedCustomers) {
      setDisplayedCustomers(JSON.parse(savedDisplayedCustomers));
    }
    if (savedSortOrder) {
      setSortOrder(savedSortOrder);
    }
    if (savedFilterType) {
      setFilterType(savedFilterType);
    }
    if (savedPage) {
      setPage(parseInt(savedPage, 10));
    }
  }, []);

  // Обновление заголовка
  useEffect(() => {
    setHeaderInfo({
      title: "Customers",
      extra: (
        <div className="header-actions">
          <button
            className="add-customer"
            onClick={() => navigate("/add-customer")}
          >
            Add New Customer <span>+</span>
          </button>
          <button className="search-btn"></button>
          <img src={defaultAvatar} alt="User Avatar" className="user-avatar" />
        </div>
      ),
    });
  }, [setHeaderInfo, navigate]);

  // Фильтрация и сортировка клиентов
  const getFilteredAndSortedCustomers = (customers) => {
    let result = [...customers];

    // Фильтрация
    if (filterType === "withPhone") {
      result = result.filter((c) => c.phone);
    } else if (filterType === "fromChicago") {
      result = result.filter((c) => c.address?.includes("Chicago"));
    }

    // Сортировка
    if (sortOrder === "asc") {
      result.sort((a, b) => a.name?.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.name?.localeCompare(a.name));
    }

    return result;
  };

  // Обработчик нажатия на кнопку "Edit"
  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  // Обработчик сохранения изменений
  const handleSave = (updatedCustomer) => {
    dispatch(updateCustomer(updatedCustomer)); // Обновляем Redux-состояние
    setDisplayedCustomers((prev) =>
      prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
    ); // Обновляем локальное состояние списка
    setIsModalOpen(false);
  };

  // Обновление отображаемых клиентов
  useEffect(() => {
    const filtered = getFilteredAndSortedCustomers(allCustomers);
    const endIndex = page * 5;
    setDisplayedCustomers(filtered.slice(0, endIndex));
    setHasMore(endIndex < filtered.length);
  }, [allCustomers, page, filterType, sortOrder]);

  // Сохранение состояния в localStorage
  useEffect(() => {
    localStorage.setItem(
      "displayedCustomers",
      JSON.stringify(displayedCustomers)
    );
    localStorage.setItem("sortOrder", sortOrder);
    localStorage.setItem("filterType", filterType);
    localStorage.setItem("page", page.toString());
  }, [displayedCustomers, sortOrder, filterType, page]);

  // Сброс страницы при изменении фильтра или сортировки
  useEffect(() => {
    setPage(1);
  }, [filterType, sortOrder]);

  // Обработчик кнопки "Load More"
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container-customers">
      <div className="info-filters">
        <h1>Total: {allCustomers.length} customers</h1>
        <div className="filters">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">No Sorting</option>
            <option value="asc">Name (A-Z)</option>
            <option value="desc">Name (Z-A)</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="withPhone">With Phone Number</option>
            <option value="fromChicago">From Chicago</option>
          </select>
        </div>
      </div>

      <div className="custom-list">
        <div className="customer-info-head">
          <span>
            <img src={customerInfo} alt="" />
          </span>
          <p>Name</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Address</p>
          <p>Edit</p>
        </div>

        <div className="customer-list">
          {displayedCustomers.length > 0 ? (
            displayedCustomers.map((customer) => (
              <div className="customer-row" key={customer.id}>
                <img
                  src={defaultAvatar}
                  alt={customer.name}
                  className="customer-avatar"
                />
                <p>{customer.name}</p>
                <p>{customer.email}</p>
                <p>{customer.phone || "N/A"}</p>
                <p>
                  {customer.address
                    ? `${customer.address.street}, ${customer.address.city}, ${customer.address.state}, ${customer.address.zip}`
                    : "No Address"}
                </p>
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(customer)}
                >
                  <img src={editButton} alt="edit" />
                </button>
              </div>
            ))
          ) : (
            <div className="no-customers">No customers found.</div>
          )}
        </div>

        {hasMore && (
          <button className="load-more" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>

      {/* Модальное окно для редактирования */}
      {isModalOpen && (
        <EditCustomerModal
          customer={selectedCustomer}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Customers;
