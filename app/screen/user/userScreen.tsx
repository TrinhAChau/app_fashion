import { DeteleUser, EditUser, GetListAccount } from "@/app/api/user";
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

  const [users, setUsers] = useState<User[]>([]) || null;
  const fetchUsers = async () => {
    try {
      // const token = await AsyncStorage.getItem("token"); // Lấy token từ storage
      // if (!token) return;
      const response = await GetListAccount(token);
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách người dùng:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Từ khóa tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");

  // ID người dùng đang chỉnh sửa
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const [editForm, setEditForm] = useState<Partial<User>>({});

  // Lọc người dùng theo tên
  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // State menu chọn quyền
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

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
        keyExtractor={(item) => item.user_id?.toString() ?? ""}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.username}
              subtitle={`Email: ${item.email}`}
            />
            <Card.Content>
              <Text>SĐT: {item.phone}</Text>
              <Text>Địa chỉ: {item.address}</Text>
              <Text>Quyền: {item.role_id === 1 ? "Admin" : "User"}</Text>
            </Card.Content>

            <Card.Actions>
              {/* Nút sửa */}
              <IconButton
                icon="pencil"
                onPress={() => {
                  setEditUserId(
                    item.user_id === editUserId
                      ? null
                      : (item.user_id as number)
                  );
                  setEditForm(item);
                }}
              />
              <IconButton
                icon="delete"
                iconColor="red"
                onPress={async () => {
                  try {
                    await DeteleUser(item.user_id as number, token);
                    fetchUsers();
                  } catch (error) {
                    console.error("Lỗi khi xóa người dùng:", error);
                  }
                }}
              />
            </Card.Actions>

            {/* Form chỉnh sửa chỉ hiển thị nếu ID đang được chọn */}
            {editUserId === item.user_id && (
              <View style={styles.editForm}>
                <TextInput
                  label="Tên"
                  value={editForm.username || ""}
                  mode="outlined"
                  style={styles.input}
                  onChangeText={(text) =>
                    setEditForm({ ...editForm, username: text })
                  }
                />
                <TextInput
                  label="Email"
                  value={editForm.email || ""}
                  mode="outlined"
                  style={styles.input}
                  onChangeText={(text) =>
                    setEditForm({ ...editForm, email: text })
                  }
                />
                <TextInput
                  label="Số điện thoại"
                  value={editForm.phone || ""}
                  mode="outlined"
                  style={styles.input}
                  onChangeText={(text) =>
                    setEditForm({ ...editForm, phone: text })
                  }
                />
                <TextInput
                  label="Địa chỉ"
                  value={editForm.address || ""}
                  mode="outlined"
                  style={styles.input}
                  onChangeText={(text) =>
                    setEditForm({ ...editForm, address: text })
                  }
                />

                {/* Dropdown chọn quyền */}
                <Text style={styles.dropdownLabel}>Quyền</Text>
                <Menu
                  visible={selectedUserId === item.user_id}
                  onDismiss={() => setSelectedUserId(null)}
                  anchor={
                    <List.Item
                      title={editForm.role_id === 1 ? "Admin" : "User"}
                      onPress={() => setSelectedUserId(item.user_id as number)}
                      titleStyle={styles.dropdownText}
                      style={styles.dropdown}
                    />
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setEditForm({ ...editForm, role_id: 1 });
                      setSelectedUserId(null);
                    }}
                    title="Admin"
                  />
                  <Menu.Item
                    onPress={() => {
                      setEditForm({ ...editForm, role_id: 2 });
                      setSelectedUserId(null);
                    }}
                    title="User"
                  />
                </Menu>

                {/* Nút lưu */}
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={async () => {
                    try {
                      const respone = await EditUser(
                        editForm,
                        editUserId,
                        token
                      );
                      setEditUserId(null);
                      fetchUsers();
                    } catch (error) {
                      console.error("Lỗi khi cập nhật người dùng:", error);
                    }
                  }}
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
