import { FlatList, StyleSheet, Text, View } from 'react-native'

const AllItems = ({data}) => {
  return (
    <View>
        <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Items</Text>
            <Text style={styles.headingText}>Quantity</Text>
        </View>

        <FlatList
        data={data}
        keyExtractor={(item)=> item.id}
        renderItem={({item}) => (
            <View style={[styles.itemContainer, {backgroundColor: item.stock < 20 ? "#FFCCCC" : "#D7F6BFFF"}]}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{item.stock}</Text>
            </View>
        )}

        contentContainerStyle={{gap:10}}
        />
    </View>
  )
}

export default AllItems

const styles = StyleSheet.create({
    headingContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical:10,
    },
    headingText:{
        fontSize:16,
        fontWeight:"500",

    },
    itemContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical:10,
        borderRadius:7,

    },
    itemText:{
        fontSize:15,
        fontWeight:"400",
    }
})