import React, { useState, useEffect } from "react";
import "./Customers.scss";

const Customers = () => {
  const [customers, setCustomers] = useState([]); // Загруженные пользователи
  const [displayedCustomers, setDisplayedCustomers] = useState([]); // Отображаемые пользователи
  const [sortByDate, setSortByDate] = useState(false); // Флаг сортировки по дате
  const [filter, setFilter] = useState("all"); // Фильтр
  const [page, setPage] = useState(1); // Текущая страница
  const [hasMore, setHasMore] = useState(true); // Флаг наличия данных

  // Моковые данные (только для теста)
  const mockCustomers = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    createdAt: `2023-10-${String(i + 1).padStart(2, "0")}`,
    isActive: i % 2 === 0, // Каждый второй - неактивен
  }));

  // Функция для загрузки новых пользователей
  const fetchCustomers = async (pageNumber) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Эмуляция задержки

    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    const newCustomers = mockCustomers.slice(startIndex, endIndex);

    if (newCustomers.length < 5) {
      setHasMore(false);
    }

    setCustomers((prev) => [...prev, ...newCustomers]);
  };

  // Загружаем первую порцию пользователей при монтировании
  useEffect(() => {
    fetchCustomers(page);
  }, []);

  // Загружаем новые данные только при нажатии "Load More"
  useEffect(() => {
    if (page > 1) {
      fetchCustomers(page);
    }
  }, [page]);

  // Применяем фильтрацию и сортировку **только к уже загруженным пользователям**
  useEffect(() => {
    let filtered = [...customers];

    // Фильтрация
    if (filter === "active") {
      filtered = filtered.filter((customer) => customer.isActive);
    } else if (filter === "inactive") {
      filtered = filtered.filter((customer) => !customer.isActive);
    }

    // Сортировка (без изменения количества данных)
    if (sortByDate) {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Отображаем только тех, кто уже загружен (чтобы фильтрация не подгружала новые)
    setDisplayedCustomers(filtered);
  }, [customers, sortByDate, filter]);

  return (
    <div className="container-customers">
      {/* Заголовок и фильтры */}
      <div className="info-filters">
        <h1>Total: {displayedCustomers.length} customers</h1>
        <div className="filters">
          <button onClick={() => setSortByDate(!sortByDate)}>
            Sort by Date {sortByDate ? "▲" : "▼"}
          </button>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Список пользователей */}
      <div className="custom-list">
        <h2>Customers List</h2>
        <ul>
          {displayedCustomers.length > 0 ? (
            displayedCustomers.map((customer, index) => (
              <li key={`${customer.id}-${index}`}>
                {" "}
                {/* Уникальный key */}
                <div className="customer-info">
                  <h3>{customer.name}</h3>
                  <p>Email: {customer.email}</p>
                  <p>
                    Created At:{" "}
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </p>
                  <p>Status: {customer.isActive ? "Active" : "Inactive"}</p>
                </div>
              </li>
            ))
          ) : (
            <li>No customers found.</li>
          )}
        </ul>

        {/* Кнопка "Load More" */}
        {hasMore && (
          <button
            className="load-more"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Customers;
