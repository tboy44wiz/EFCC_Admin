import * as Yup from 'yup'; // for everything


class YupValidator {


    /*=====================================================================================*/
    /*===================================== FOR USERS =====================================*/
    static registerAgent = Yup.object().shape({
        firstName: Yup.string().required("First name is required."),
        middleName: Yup.string().required("Middle name is required."),
        lastName: Yup.string().required("Last name is required."),
        emailAddress: Yup.string().required("Email is required.").email("Email must be a valid email."),
        phoneNumber: Yup.string().required("Phone name is required."),
        roleId: Yup.string().required("User role is required."),
        department: Yup.string().required("Department must is required."),
        zone: Yup.string().required("User role must is required"),
    });
    static createPassword = Yup.object().shape({
        agentId: Yup.string().required("Agent ID is required."),
        password: Yup.string().required("Password is required.")
            .matches(/^(?=.*[A-Z])/, "Password must contain an Uppercase character.")
            .matches(/^(?=.*[0-9])/, "Password must contain a Number.")
            .matches(/^(?=.*[!@#\$%\^&\*])/, "Password must contain a Special character."),
        confirmPassword: Yup.string().required("Confirm Password is required.")
            .oneOf([Yup.ref("password")], "Passwords does not match."),
    });

    static userLogin = Yup.object().shape({
        username: Yup.string().required("Username is required.").email("Username must be a valid email."),
        password: Yup.string().required("Password is required."),
    });


    /*=====================================================================================*/
    /*===================================== FOR CASE =====================================*/
    static createCaseValidation = Yup.object().shape({
        agentId: Yup.string().required("Agent_ID is required."),
        caseType: Yup.string().required("Case type is required."),
        caseDescription: Yup.string().required("Case description is required."),
        applicant: Yup.array({}, "", "", "", "").of(Yup.string().required()).min(1, "At least one applicant name must is required."),
        deponent: Yup.string().required("Defendant is required."),
        individualName: Yup.array({}, "", "", "", "").of(Yup.string().required()).min(1, "At least one individual name must is required."),
        enterpriseName: Yup.array({}, "", "", "", "").of(Yup.string()),
        court: Yup.string().required("Court is required."),
        courtLocation: Yup.string().required("Court location is required."),
        presidingJudge: Yup.string().required("Presiding judge is required."),
        suitNo: Yup.string().required("Suit number is required."),
        suitDate: Yup.string().required("Suit date is required."),
        uploadFile: Yup.array({}, "", "", "", "").of(
            Yup.object().shape({
                fileName: Yup.string().required(),
                base64Image: Yup.string().required(),
            }),
        ).min(1, "You must upload at least one single files."),
    });
    static caseStatusValidation = Yup.object().shape({
        caseId: Yup.string().required("Case ID is required."),
        newStatus: Yup.number().typeError("Select a case status."),
        message: Yup.string().required("Comment is required."),
    });
    static caseQueryValidation = Yup.object().shape({
        caseId: Yup.string().required("Case ID is required."),
        queryReason: Yup.string().required("There must be a reason for querying a case."),
    });


    /*=====================================================================================*/
    /*===================================== FOR ASSET =====================================*/
    static tangibleAssetsDataValidation = Yup.object().shape({
        caseId: Yup.string().required("Case_ID is required."),
        assetClassification: Yup.number().required("Asset classification is required."),
        assetCategory: Yup.number().required("Asset category is required."),
        assetType: Yup.string().required("Asset type is required."),
        assetName: Yup.string().required("Asset name is required."),
        country: Yup.string().required("Country is required."),
        state: Yup.string().required("State is required."),
        streetAddress: Yup.string().required("Street address is required."),
        quantity: Yup.number().required("Quantity is required."),
        currency: Yup.string().required("Currency is required."),
        unitPrice: Yup.number().required("Unit price is required."),
        value: Yup.number().required("Value is required."),
        description: Yup.string().required("Assets description is required."),
        uploadFile: Yup.array({}, "", "", "", "").of(
            Yup.object().shape({
                fileName: Yup.string().required(),
                base64Image: Yup.string().required(),
            }),
        ).min(1, "You must upload at least one single files."),
    });

    static intangibleAssetsDataValidation = Yup.object().shape({
        caseId: Yup.string().required("Case_ID is required."),
        assetClassification: Yup.number().required("Asset classification is required."),
        assetCategory: Yup.number().required("Asset category is required."),
        assetType: Yup.string().required("Asset type is required."),
        assetName: Yup.string().required("Asset name is required."),
        nameOfBank: Yup.string().required("Name of bank / holding firm is required."),
        quantity: Yup.number().required("Quantity is required."),
        currency: Yup.string().required("Currency is required."),
        unitPrice: Yup.number().required("Unit price is required."),
        value: Yup.number().required("Value is required."),
        description: Yup.string().required("Assets description is required."),
        uploadFile: Yup.array({}, "", "", "", "").of(
            Yup.object().shape({
                fileName: Yup.string().required(),
                base64Image: Yup.string().required(),
            }),
        ).min(1, "You must upload at least one single files."),
    });
}

export default YupValidator;