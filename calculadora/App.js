import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [n1, setN1] = useState('');
  const [n2, setN2] = useState('');
  const [resultado, setResultado] = useState('');

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} keyboardType="numeric" value={n1} onChangeText={setN1} />
      <TextInput style={styles.input} keyboardType="numeric" value={n2} onChangeText={setN2} />

      <View style={styles.linha}>
        <View style={styles.caixa}>
          <Button title="+" onPress={() => setResultado(Number(n1) + Number(n2))} />
        </View>
        <View style={styles.caixa}>
          <Button title="-" onPress={() => setResultado(Number(n1) - Number(n2))} />
        </View>
        <View style={styles.caixa}>
          <Button title="*" onPress={() => setResultado(Number(n1) * Number(n2))} />
        </View>
        <View style={styles.caixa}>
          <Button title="/" onPress={() => setResultado(Number(n1) / Number(n2))} />
        </View>
      </View>

      <Text>Resultado: {resultado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    width: 200,
    color: '#000',
    margin: 5,
  },
  linha: {
    flexDirection: 'row',
  },
  caixa: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
    width: 60,
  },
});
