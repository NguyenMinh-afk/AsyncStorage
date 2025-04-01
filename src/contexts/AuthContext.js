import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native'; // Import Alert để hiển thị thông báo
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Trạng thái đăng nhập

  // Lấy trạng thái đăng nhập từ AsyncStorage khi ứng dụng khởi động
  useEffect(() => {
    const loadLoginStatus = async () => {
      try {
        const storedStatus = await AsyncStorage.getItem('isLoggedIn');
        console.log('📥 Lấy từ AsyncStorage:', storedStatus);
        if (storedStatus !== null) {
          const parsedStatus = JSON.parse(storedStatus);
          setIsLoggedIn(parsedStatus);

          // Hiển thị thông báo "Welcome back, Minh!" nếu đăng nhập trước đó
          if (parsedStatus) {
            setTimeout(() => {
              Alert.alert('👋 Welcome back, Minh!');
            }, 500); // Delay để tránh lỗi giao diện
          }
        } else {
          setIsLoggedIn(false); // Giá trị mặc định nếu chưa có dữ liệu
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
