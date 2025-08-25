import DefaultResponse from "../utils/DefaultResponse";

const validateInput = async (data: object, module: any) => {
    try {
        let validData = await module.validateAsync(data);
        return DefaultResponse.successFormat("200", validData);
    } catch (err:any) {
        return DefaultResponse.errorFormat("000", typeof(err) === "object" || err !== null ? err.details[0].message : '', {
            path: err.details[0].path[0]
        });
    }
}

export default validateInput