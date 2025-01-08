import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const CreateScreen = ({ data, setData }) => {
  const [itemName, setItemName] = useState('');
  const [stockAmt, setStockAmt] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const addItemHandler = () => {
    const newItem = {
      id: Date.now(),
      name: itemName,
      stock: stockAmt,
    };

    setData([...data, newItem]);
    setItemName('');
    setStockAmt('');
    setIsEdit(false);
  };

  const deleteItemHandler = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const editItemHandler = (item) => {
    setIsEdit(true);
    setItemName(item.name);
    setStockAmt(item.stock);
    setEditItemId(item.id);
  };

  const updateItemHandler = () => {
    setData(
      data.map((item) =>
        item.id === editItemId
          ? { ...item, name: itemName, stock: stockAmt }
          : item
      )
    );
    setItemName('');
    setStockAmt('');
    setIsEdit(false);
    setEditItemId(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter item name..."
        placeholderTextColor={'#999'}
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
      />

      <TextInput
        placeholder="Enter item stock..."
        placeholderTextColor={'#999'}
        style={styles.input}
        value={stockAmt}
        onChangeText={setStockAmt}
        keyboardType="numeric"
      />

      <Pressable style={styles.btn}>
        <Text
          style={styles.btnText}
          onPress={() => (isEdit ? updateItemHandler() : addItemHandler())}
        >
          {isEdit ? 'EDIT ITEM IN STOCK' : 'ADD ITEM IN STOCK'}
        </Text>
      </Pressable>

      <View style={{ marginTop: 10 }}>
        <Text style={styles.headingText}>All items in stock</Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.itemContainer,
                { backgroundColor: item.stock < 20 ? '#FFCCCC' : '#D7F6BFFF' },
              ]}
            >
              <Text style={styles.itemText}>{item.name}</Text>

              <View style={{ flexDirection: 'row', gap: 20 }}>
                <Text style={styles.itemText}>{item.stock}</Text>

                <Pressable onPress={() => editItemHandler(item)}>
                  <Text style={styles.itemText}>Edit</Text>
                </Pressable>

                <Pressable onPress={() => deleteItemHandler(item.id)}>
                  <Text style={styles.itemText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '4%',
    gap: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#D7F6BFFF',
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 16,
  },
  btn: {
    backgroundColor: '#CABFEEFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  headingText: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '400',
  },
});
