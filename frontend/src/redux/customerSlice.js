import { createSlice } from "@reduxjs/toolkit";

// Функция для загрузки данных из localStorage
const loadCustomersFromLocalStorage = () => {
  const savedCustomers = localStorage.getItem("customers");
  return savedCustomers ? JSON.parse(savedCustomers) : [];
};

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: loadCustomersFromLocalStorage(), // Загружаем данные из localStorage
  },
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
      // Сохраняем данные в localStorage после добавления пользователя
      localStorage.setItem("customers", JSON.stringify(state.customers));
    },
    updateCustomer: (state, action) => {
      const index = state.customers.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
        // Сохраняем данные в localStorage после обновления пользователя
        localStorage.setItem("customers", JSON.stringify(state.customers));
      }
    },
  },
});

export const { addCustomer, updateCustomer } = customerSlice.actions;
export default customerSlice.reducer;