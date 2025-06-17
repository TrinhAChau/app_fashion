import {
  CreateCategory,
  DeteleCategory,
  GetListCategory,
  UpdateCateGory,
} from "@/app/api/caterory";
import { Category } from "@/app/types/category.type";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Searchbar,
  Text,
  TextInput,
} from "react-native-paper";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJyb2xlX2lkIjoxLCJpYXQiOjE3NTAwMDI5ODF9.uhsG5MBzY3dAP0ZG0wcbBYf98kZRlf50iRPDmQXSUs4";

// Dữ liệu mẫu ban đầu

const CategoryScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]) || null; // Danh sách danh mục hiển thị

  //Hàm lấy data DS sản phẩm
  const fetchCategory = async () => {
    try {
      const response = await GetListCategory();
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách người dùng:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [editCategoryId, setEditCategoryId] = useState(0); // ID đang chỉnh sửa

  const [adding, setAdding] = useState(false); // Trạng thái hiển thị form thêm mới
  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    description: "",
    parent_id: null, // thêm parent_id
  });

  const [editedCategory, setEditedCategory] = useState<Category>({
    name: "",
    description: "",
    parent_id: null,
  });

  // Lọc danh mục theo từ khóa
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Lưu chỉnh sửa
  const handleSaveEdit = async () => {
    const isDuplicate = categories.some(
      (cat) =>
        cat.name.toLowerCase().trim() ===
          editedCategory.name.toLowerCase().trim() &&
        cat.category_id !== editCategoryId
    );
    if (isDuplicate) {
      Alert.alert("Lỗi", "Tên danh mục đã tồn tại.");
      return;
    }
    try {
      await UpdateCateGory(editedCategory, editCategoryId, token);
      await fetchCategory();
      setEditCategoryId(0);
      Alert.alert("Thành công", "Đã cập nhật danh mục.");
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      Alert.alert("Lỗi", "Không thể cập nhật.");
    }
  };

  // Xóa danh mục
  const handleDelete = (id: number) => {
    Alert.alert("Xác nhận", "Bạn có muốn xoá danh mục này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xoá",
        style: "destructive",
        onPress: async () => {
          try {
            await DeteleCategory(id, token);
            await fetchCategory();
            Alert.alert("Đã xoá thành công");
          } catch (err) {
            console.error("Lỗi xoá:", err);
            Alert.alert("Lỗi", "Không thể xoá danh mục.");
          }
        },
      },
    ]);
  };

  // Thêm danh mục mới
  const handleAdd = async () => {
    if (!newCategory.name.trim()) return;

    const isDuplicate = categories.some(
      (cat) =>
        cat.name.toLowerCase().trim() === newCategory.name.toLowerCase().trim()
    );

    if (isDuplicate) {
      Alert.alert("Lỗi", "Danh mục đã tồn tại.");
      return;
    }

    try {
      await CreateCategory(newCategory, token);
      await fetchCategory();
      setNewCategory({ name: "", description: "" });
      setAdding(false);
      Alert.alert("Thành công", "Đã thêm danh mục.");
    } catch (err) {
      console.error("Lỗi thêm danh mục:", err);
      Alert.alert("Lỗi", "Không thể thêm danh mục.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm + nút thêm */}
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

      {/* Form thêm danh mục */}
      {adding && (
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Tên danh mục"
              value={newCategory.name}
              onChangeText={(text) =>
                setNewCategory((prev) => ({ ...prev, name: text }))
              }
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Mô tả"
              value={newCategory.description}
              onChangeText={(text) =>
                setNewCategory((prev) => ({ ...prev, description: text }))
              }
              mode="outlined"
              style={styles.input}
            />
            <Text style={styles.label}>Danh mục liên quan</Text>
            <Picker
              selectedValue={newCategory.parent_id}
              onValueChange={(value) =>
                setNewCategory((prev) => ({ ...prev, parent_id: value }))
              }
              style={styles.input}
            >
              <Picker.Item label="---" value={null} />
              {categories.map((cat) => (
                <Picker.Item
                  key={cat.category_id}
                  label={cat.name}
                  value={cat.category_id}
                />
              ))}
            </Picker>
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

      {/* Danh sách danh mục */}
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.category_id?.toString() || ""}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.name}
              subtitle={`Mô tả: ${item.description}`}
            />
            <Card.Actions>
              <IconButton
                icon="pencil"
                onPress={() => {
                  setEditCategoryId((item.category_id as number) || 0);
                  setEditedCategory(item);
                }}
              />
              <IconButton
                icon="delete"
                iconColor="red"
                onPress={() => handleDelete(item.category_id as number)}
              />
            </Card.Actions>

            {/* Form chỉnh sửa */}
            {editCategoryId === item.category_id && (
              <View style={styles.editForm}>
                <TextInput
                  label="Tên danh mục"
                  value={editedCategory.name}
                  onChangeText={(text) =>
                    setEditedCategory((prev) => ({ ...prev, name: text }))
                  }
                  mode="outlined"
                  style={styles.input}
                />
                <TextInput
                  label="Mô tả"
                  value={editedCategory.description}
                  onChangeText={(text) =>
                    setEditedCategory((prev) => ({
                      ...prev,
                      description: text,
                    }))
                  }
                  mode="outlined"
                  style={styles.input}
                />
                <Text style={styles.label}>Danh mục liên quan</Text>
                <Picker
                  selectedValue={editedCategory.parent_id ?? null}
                  onValueChange={(value) =>
                    setEditedCategory((prev) => ({ ...prev, parent_id: value }))
                  }
                  style={styles.input}
                >
                  <Picker.Item label="---" value={null} />
                  {categories
                    .filter((cat) => cat.category_id !== editCategoryId)
                    .map((cat) => (
                      <Picker.Item
                        key={cat.category_id}
                        label={cat.name}
                        value={cat.category_id}
                      />
                    ))}
                </Picker>

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
  container: { flex: 1, padding: 16 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  searchBar: { flex: 1, marginRight: 8 },
  addButton: { backgroundColor: "#007AFF" },
  card: { marginBottom: 12, backgroundColor: "#F0F4FF" },
  input: { marginBottom: 10, backgroundColor: "white" },
  button: { marginRight: 8, marginTop: 10 },
  row: { flexDirection: "row", justifyContent: "flex-end" },
  editForm: { padding: 12 },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CategoryScreen;
