import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function FanIDScreen() {
  const fan = {
    id: "FAN-2030-0001",
    nom: "John Doe",
    email: "john@email.com",
    pays: "Maroc",
    expiration: "31/12/2030",
  };

  const generatePDF = async () => {
    const html = `
      <html>
        <body style="font-family: Arial; text-align: center;">
          <h1>Fan ID</h1>
          <p><strong>ID :</strong> ${fan.id}</p>
          <p><strong>Nom :</strong> ${fan.nom}</p>
          <p><strong>Email :</strong> ${fan.email}</p>
          <p><strong>Pays :</strong> ${fan.pays}</p>
          <p><strong>Expiration :</strong> ${fan.expiration}</p>
        </body>
      </html>
    `;

    const file = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(file.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Fan ID</Text>

        <QRCode value={fan.id} size={120} />

        <Text style={styles.text}>Nom : {fan.nom}</Text>
        <Text style={styles.text}>Email : {fan.email}</Text>
        <Text style={styles.text}>Pays : {fan.pays}</Text>
        <Text style={styles.expire}>
          Expire le {fan.expiration}
        </Text>

        <TouchableOpacity style={styles.button} onPress={generatePDF}>
          <Text style={styles.buttonText}>Télécharger en PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F6E7",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#7B1E16",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 22,
    marginBottom: 15,
  },
  text: {
    color: "#FFF",
    marginTop: 8,
  },
  expire: {
    color: "#cac49eff",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ded9bcff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  }, 
  buttonText: {
    color: "#7B1E16",
    fontWeight: "bold",
  },
});