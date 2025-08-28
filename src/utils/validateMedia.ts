import DefaultResponse from "./DefaultResponse";

const validateMediaInput = async (data: any) => {
    try {
        // Project ID check
        if (!data.projectId) {
            return DefaultResponse.errorFormat("000", "Project ID is required", { path: "projectId" });
        }

        // Media type check
        if (!data.type || !["image", "video"].includes(data.type)) {
            return DefaultResponse.errorFormat("000", "Media type must be 'image' or 'video'", { path: "type" });
        }

        // Files check
        if (!data.files || !Array.isArray(data.files) || data.files.length === 0) {
            return DefaultResponse.errorFormat("000", "At least one file is required", { path: "files" });
        }

        return DefaultResponse.successFormat("200", data);

    } catch (err) {
        return DefaultResponse.errorFormat("000", "Invalid media input", {});
    }
};

export default validateMediaInput;
