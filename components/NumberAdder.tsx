import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, Alert } from 'react-native';

type ResultType = {
  sum: number | null;
};

const NumberAdder = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<ResultType>({ sum: null });

  const calculate = () => {
    const numbers = [parseFloat(num1), parseFloat(num2)].filter(num => !isNaN(num));

    if (numbers.length === 2) {
      const sum = numbers[0] + numbers[1];
      setResult({ sum });
    } else {
      setResult({ sum: null });
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ 2 số hợp lệ!');
    }
  };

  const clearInput = () => {
    setNum1('');
    setNum2('');
    setResult({ sum: null });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Tính Tổng Hai Số</Text>

      <Text style={styles.text2}>Nhập 2 số vào các ô dưới</Text>

      <Image
        source={{ uri: 'https://picsum.photos/200/200' }}
        style={styles.image}
        resizeMode="cover"
      />

      <TextInput
        style={styles.input}
        placeholder="Số thứ 1"
        value={num1}
        onChangeText={setNum1}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Số thứ 2"
        value={num2}
        onChangeText={setNum2}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button title="Tính tổng" color="#3498db" onPress={calculate} />
        <Button title="Xóa" color="#e74c3c" onPress={clearInput} />
      </View>

      <Text style={styles.text3}>
        {result.sum !== null ? `Tổng: ${result.sum}` : 'Chưa có kết quả'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  text1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  text2: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#3498db',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#3498db',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  text3: {
    fontSize: 16,
    color: '#e74c3c',
    fontStyle: 'italic',
  },
});

export default NumberAdder;