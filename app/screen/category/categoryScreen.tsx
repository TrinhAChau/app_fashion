import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Searchbar,
  TextInput,
} from "react-native-paper";

// Dữ liệu mẫu ban đầu
const mockCategories = [
  { id: "1", name: "Áo", description: "Các loại áo thời trang" },
  { id: "2", name: "Quần", description: "Các loại quần thời trang" },
];

const CategoryScreen = () => {
  const [categories, setCategories] = useState(mockCategories); // Danh sách danh mục hiển thị
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null); // ID đang chỉnh sửa
  const [editedCategory, setEditedCategory] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [adding, setAdding] = useState(false); // Trạng thái hiển thị form thêm mới
  const [newCategory, setNewCategory] = useState({
    id: "",
    name: "",
    description: "",
  });

  // Lọc danh mục theo từ khóa
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Lưu chỉnh sửa
  const handleSaveEdit = () => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === editedCategory.id ? editedCategory : cat))
    );
    setEditCategoryId(null);
  };

  // Xóa danh mục
  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Thêm danh mục mới
  const handleAdd = () => {
    if (!newCategory.name.trim()) return; // Kiểm tra không để trống tên
    const newItem = {
      ...newCategory,
      id: Date.now().toString(), // ID tạm thời dùng timestamp
    };
    setCategories((prev) => [newItem, ...prev]);
    setNewCategory({ id: "", name: "", description: "" });
    setAdding(false);
  };

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm và nút Thêm */}
      <View style={styles.topBar}>
        <Searchbar
          placeholder="Tìm kiếm danh mục"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
        />
        <IconButton
          icon="plus"
          size={28}
          onPress={() => setAdding(true)}
          style={styles.addButton}
          iconColor="white"
        />
      </View>

      {/* Form thêm danh mục mới */}
      {adding && (
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Tên danh mục"
              value={newCategory.name}
              onChangeText={(text) =>
                setNewCategory({ ...newCategory, name: text })
              }
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Mô tả"
              value={newCategory.description}
              onChangeText={(text) =>
                setNewCategory({ ...newCategory, description: text })
              }
              mode="outlined"
              style={styles.input}
            />
            <View style={styles.row}>
              <Button
                mode="contained"
                onPress={handleAdd}
                style={styles.button}
              >
                Thêm
              </Button>
              <Button
                mode="outlined"
                onPress={() => setAdding(false)}
                style={styles.button}
              >
                Hủy
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Danh sách các danh mục */}
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.name}
              subtitle={`Mô tả: ${item.description}`}
            />
            <Card.Actions>
              {/* Nút sửa */}
              <IconButton
                icon="pencil"
                onPress={() => {
                  setEditCategoryId(item.id);
                  setEditedCategory(item); // Gán giá trị để chỉnh sửa
                }}
              />
              {/* Nút xóa */}
              <IconButton
                icon="delete"
                iconColor="red"
                onPress={() => handleDelete(item.id)}
              />
            </Card.Actions>

            {/* Form chỉnh sửa nếu đúng ID */}
            {editCategoryId === item.id && (
              <View style={styles.editForm}>
                <TextInput
                  label="Tên danh mục"
                  value={editedCategory.name}
                  onChangeText={(text) =>
                    setEditedCategory({ ...editedCategory, name: text })
                  }
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Mô tả"
                  value={editedCategory.description}
                  onChangeText={(text) =>
                    setEditedCategory({
                      ...editedCategory,
                      description: text,
                    })
                  }
                  mode="outlined"
                  style={styles.input}
                />
                <Button
                  mode="contained"
                  onPress={handleSaveEdit}
                  style={styles.button}
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
  container: {
    flex: 1,
    padding: 16,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  searchBar: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#007AFF",
  },
  card: {
    marginBottom: 12,
    backgroundColor: "#F0F4FF",
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginRight: 8,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end", // Các nút nằm cùng hàng
  },
  editForm: {
    padding: 12,
  },
});

export default CategoryScreen;
