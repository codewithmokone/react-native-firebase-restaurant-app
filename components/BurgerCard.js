import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { db } from '../config/firebase';
import { getDocs } from 'firebase/firestore';

const BurgerCard = () => {

    const [burgerMenu, setBurgerMenu] = useState();

    const fetchFirestoreData = async () => {
        try {
            const burgerMenuCollection = (collection(db, "burgers"));
            const burgerMenuSnapshot = await getDocs(
                query(burgerMenuCollection)
            )
            const data =[];
            burgerMenuSnapshot.forEach((doc) => {
                const burgerMenu = doc.data();
                data.push({id: doc.id, ...burgerMenu});
            });
            setBurgerMenu(data);
            console.log(data)
           
        } catch (error) {
            console.error('Error fetching Firestore data:', error);
        }
    };

    useEffect(() => {
        // Call the function to fetch data
        fetchFirestoreData();
    }, [])

  return (
    <View>
      <Text>BurgerCard</Text>
    </View>
  )
}

export default BurgerCard

const styles = StyleSheet.create({})