import {
    grey900,
    grey100,
    grey500,
    brown500,
    white,
    red500,
    grey200,
    fullBlack,
    blue400,
    orange500
} from "material-ui/styles/colors";
import {fade} from "material-ui/utils/colorManipulator";

export default {
    fontFamily: 'Roboto, sans-serif',

    palette: {
        primary4Color: orange500,
        primary3Color: grey500,
        primary2Color: blue400,
        primary1Color: blue400,
        accent1Color: red500,
        accent2Color: grey500,
        accent3Color: grey500,
        textColor: brown500,
        alternateTextColor: white,
        canvasColor: grey200,
        borderColor: grey200,
        pickerHeaderColor: blue400,
        shadowColor: fullBlack,
        hoverColor: fade(grey900, 0.07),
    },

    appBar: {
        color: blue400,
    },

    menuItem: {
        dataHeight: 32,
        height: 48,
        hoverColor: fade(grey900, 0.07),
        selectedTextColor: blue400,
        rightIconDesktopFill: grey500,
    },

    table: {
        backgroundColor: white,
    },
    tableFooter: {
        borderColor: grey200,
        textColor: brown500,
    },
    tableHeader: {
        borderColor: grey200,
    },
    tableHeaderColumn: {
        textColor:  brown500,
        height: 48,
        spacing: 5,
    },
    tableRow: {
        hoverColor: grey100,
        selectedColor: grey200,
        stripeColor: grey100,
        textColor: brown500,
        borderColor: grey200,
        height: 48,
    },
    tableRowColumn: {
        height: 48,
        spacing: 5
    },
    drawer: {
        color:grey200
    },
    textField: {
        disabledTextColor: brown500,
    },
    paper: {
        backgroundColor: white
    }
};

