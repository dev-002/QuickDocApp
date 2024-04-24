import { View, TextInput } from "react-native";
import React from "react";
import Icons from "react-native-vector-icons/FontAwesome";
import SelectDropDown from "react-native-select-dropdown";

const Search = ({ fetchAppointment, search, setSearch }) => {
  return (
    <View className="flex-row items-center justify-evenly">
      <TextInput
        // placeholder={searchType == 2 ? "year-month-date" : "Search"}
        placeholder="search patient name"
        value={search}
        className="p-1 w-[80%] bg-white"
        onChangeText={(text) => setSearch(text)}
      />

      <Icons.Button
        name="search"
        iconStyle={{
          color: "black",
        }}
        className="m-auto w-full bg-white"
        onPress={() => fetchAppointment()}
      />

      {/* <SelectDropDown
        data={["Doctor", "Date"]}
        onSelect={(selectedItem, index) => setSearchType(index + 1)}
        buttonTextAfterSelection={(selectedItem) => selectedItem}
        rowTextForSelection={(item) => item}
        defaultButtonText={searchType == 1 ? "Doctor" : "Date"}
        buttonTextStyle={{ color: "black", fontWeight: 200 }}
        buttonStyle={{
          width: "30%",
          backgroundColor: "white",
          padding: 2,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "black",
          borderRadius: 10,
        }}
        dropdownStyle={{ borderRadius: 10 }}
      /> */}
    </View>
  );
};

export default Search;
