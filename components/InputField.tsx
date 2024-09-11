import {
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    StyleSheet,
} from "react-native";
import { InputFieldProps } from "@/types/type";

const InputField = ({
    label,
    icon,
    secureTextEntry = false,
    labelStyle,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    ...props
}: InputFieldProps) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ width: "100%" }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ marginVertical: 10, width: "100%" }}>
                    {label && (
                        <Text style={[styles.label, labelStyle]}>
                            {label}
                        </Text>
                    )}
                    <View style={[styles.inputContainer, containerStyle]}>
                        {icon && (
                            <Image source={icon} style={[styles.icon, iconStyle]} />
                        )}
                        <TextInput
                            style={[styles.input, inputStyle]}
                            secureTextEntry={secureTextEntry}
                            {...props}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F1F1",
        borderRadius: 50,
        paddingHorizontal: 15,
        borderColor: "#E2E8F0",
        borderWidth: 1,
        height: 50,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
        color: "#333",
    },
});

export default InputField;
