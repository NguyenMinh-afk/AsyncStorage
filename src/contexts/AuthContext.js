import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Đặt null để tránh lỗi render khi chưa tải dữ liệu

  // Lấy trạng thái đăng nhập từ AsyncStorage khi ứng dụng khởi động
  useEffect(() => {
    const loadLoginStatus = async () => {
      try {
        const storedStatus = await AsyncStorage.getItem('isLoggedIn');
        console.log('📥 Lấy từ AsyncStorage:', storedStatus);
        if (storedStatus !== null) {
          setIsLoggedIn(JSON.parse(storedStatus)); // Chuyển đổi thành boolean
        } else {
          setIsLoggedIn(false); // Giá trị mặc định nếu chưa có trong AsyncStorage
        }
      } catch (error) {
        console.error('❌ Lỗi khi tải trạng thái đăng nhập:', error);
      }
    };

    loadLoginStatus();
  }, []);

  // Lưu trạng thái `isLoggedIn` vào AsyncStorage mỗi khi thay đổi
  useEffect(() => {
    if (isLoggedIn !== null) {
      const saveLoginStatus = async () => {
        try {
          console.log('💾 Lưu vào AsyncStorage:', isLoggedIn);
          await AsyncStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        } catch (error) {
          console.error('❌ Lỗi khi lưu trạng thái đăng nhập:', error);
        }
      };

      saveLoginStatus();
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
