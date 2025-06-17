import { GetListAccount } from "@/app/api/user";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  List,
  Menu,
  Searchbar,
  Text,
  TextInput,
} from "react-native-paper";

import { User } from "../../types/user.type";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJyb2xlX2lkIjoxLCJpYXQiOjE3NTAwMDI5ODF9.uhsG5MBzY3dAP0ZG0wcbBYf98kZRlf50iRPDmQXSUs4";
const UserScreen = () => {
  // Dữ liệu mẫu người dùng
  const mockUsers = [
    {
      id: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phone: "0901234567",
      address: "Hà Nội",
      role: "admin",
    },
    {
      id: "2",
      name: "Trần Thị B",
      email: "tranthib@yahoo.com",
      phone: "0934567890",
      address: "TP. HCM",
      role: "user",
    },
    {
      id: "3",
      name: "Lê Văn C",
      email: "levanc@hotmail.com",
      phone: "0987654321",
      address: "Đà Nẵng",
      role: "user",
    },
  ];
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const token = await AsyncStorage.getItem("token"); // Lấy token từ storage
        // if (!token) return;
        const response = await GetListAccount(token);
        setUsers(response);
      } catch (error) {
        console.error("Lỗi lấy danh sách người dùng:", error);
      }
    };
    fetchUsers();
  }, []);

  console.log(users);

  // Từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");

  // ID người dùng đang chỉnh sửa
  const [editUserId, setEditUserId] = useState<string | null>(null);

  // Lọc người dùng theo tên
  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // State menu chọn quyền
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <Searchbar
        placeholder="Tìm kiếm theo tên"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.searchBar}
      />

      {/* Danh sách người dùng */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.name} subtitle={`Email: ${item.email}`} />
            <Card.Content>
              <Text>SĐT: {item.phone}</Text>
              <Text>Địa chỉ: {item.address}</Text>
              <Text>Quyền: {item.role === "admin" ? "Admin" : "User"}</Text>
            </Card.Content>

            <Card.Actions>
              {/* Nút sửa */}
              <IconButton
                icon="pencil"
                onPress={() =>
                  setEditUserId(item.id === editUserId ? null : item.id)
                }
              />
              {/* Nút xóa - chưa xử lý */}
              <IconButton icon="delete" iconColor="red" onPress={() => {}} />
            </Card.Actions>

            {/* Form chỉnh sửa chỉ hiển thị nếu ID đang được chọn */}
            {editUserId === item.id && (
              <View style={styles.editForm}>
                <TextInput
                  label="Tên"
                  value={item.name} // ⚠️ hiện tại chưa cập nhật được value nếu người dùng chỉnh sửa
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Email"
                  value={item.email}
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Số điện thoại"
                  value={item.phone}
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Địa chỉ"
                  value={item.address}
                  mode="outlined"
                  style={styles.input}
                />

                {/* Dropdown chọn quyền */}
                <Text style={styles.dropdownLabel}>Quyền</Text>
                <Menu
                  visible={selectedUserId === item.id}
                  onDismiss={() => setSelectedUserId(null)}
                  anchor={
                    <List.Item
                      title={item.role === "admin" ? "Admin" : "User"}
                      onPress={() => setSelectedUserId(item.id)}
                      titleStyle={styles.dropdownText}
                      style={styles.dropdown}
                    />
                  }
                >
                  {/* ⚠️ 2 Menu.Item bên dưới chưa gán lại role cho user */}
                  <Menu.Item onPress={() => {}} title="Admin" />
                  <Menu.Item onPress={() => {}} title="User" />
                </Menu>

                {/* Nút lưu */}
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={() => setEditUserId(null)} // ⚠️ chỉ tắt form, chưa cập nhật dữ liệu
                >
                  Lưu
                </Button>
              </View>
            )}
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  searchBar: { marginBottom: 16 },
  card: { marginBottom: 12, backgroundColor: "#F0F4FF" },
  editForm: { padding: 12 },
  input: { marginBottom: 10 },
  button: { marginTop: 10 },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
    marginTop: 12,
  },
});

export default UserScreen;
