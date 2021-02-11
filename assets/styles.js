import { StyleSheet } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
    useResponsiveFontSize
} from "react-native-responsive-dimensions";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

/* HEADER STYLE */
export default styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        height: '100%',
        color: "#3c3c3c",
        //marginBottom: 60
    },
    scrollView: {
        backgroundColor: 'pink',
        padding: 20,
    },
    text: {
        marginBottom: 60,
    },
    backBtn: {
        marginLeft: 20,
        //fontSize: 20
    },
    sendBtn: {
        backgroundColor: '#fdcd01',
        flexDirection: "row",
        padding: 20,
        borderWidth: 2,
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    fixedFooter: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        color: "#3c3c3c"
    },
    instructions: {
        color: "#3c3c3c",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600"
    },
    descriptions: {
        color: "#3c3c3c",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "400",
        marginTop: 4
    }
});