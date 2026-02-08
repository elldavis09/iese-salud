import userService from "@/services/userService.js";

export async function fetchUser() {
    const data = await userService.getUser();
    return data.data;
}