import { StyleSheet } from "react-native";

export default StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#9bc7d2',
        paddingTop:80,
        paddingBottom:20
    },

    containerAdd: {
        flex: 1,
        backgroundColor: '#9bc7d2',
    },
    containerList: {
        flex: 1,
        backgroundColor: '#9bc7d2',
    },
    containerSettings: {
        flex: 1,
        backgroundColor: '#9bc7d2',
    },

    header:{
        textAlign: 'center',
        fontSize:30,
        fontWeight: 'bold',
        color: '#476369',
        marginBottom:50,
        marginTop:50,
        fontFamily:'Avenir'
    },

    dateHeader:{
        textAlign: 'center',
        fontSize:20,
        fontWeight: 'bold',
        color: '#476369',
        marginBottom:10,
        marginTop:30,
        fontFamily:'Avenir'
    },

    button:{
        alignItems: 'center',
        justifyContent: 'center',
        margin:10,
        textAlign:'center',
        fontSize:20,
        borderRadius: 50,
        backgroundColor: '#476369',
        color: '#ffffff',
        fontFamily:'Avenir'
    },

    sportButton:{
        paddingLeft:10,
        paddingRight:10,
        textAlign:'center',
    },

    selectedSport:{
        backgroundColor:'#476369'
    },

    buttonRow:{
        margin:25,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
    },

    durationAndDistance:{
        textAlign: 'left',
        height: 50,
        borderWidth: 2,
        borderColor: '#476369',
        borderRadius: 5 ,
        backgroundColor : "#ffffff",
        paddingBottom: 10,
        paddingTop:10,
        marginTop:20,
        marginLeft:10,
        marginRight:10
    },

    calendar:{
        marginRight:133,
        marginBottom:30,
        marginTop:10
    },

    workoutItem: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginBottom: 15,
        marginLeft:10,
        marginRight:10,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: '#476369',
    },
    
    distances: {
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop:25,
        marginBottom:25
    },

    distanceButton: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        margin:10,
        textAlign:'center',
        fontSize:20,
        borderRadius: 50,
        backgroundColor: '#476369',
        color: '#ffffff',
    },

    textDistance: {
        color:'#ffffff',
        textAlign:'center',
        padding:10,
        fontFamily:'Avenir'
    },

    runIcon: {
        color: '#ffffff',
        fontSize: 20
    },

    radioButton:{
        marginLeft:20,
        marginRight:10,
    }
})