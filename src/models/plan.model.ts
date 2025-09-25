import db from "../config/db";
import DefaultResponse from "../utils/DefaultResponse";
import logger from "../config/logger";
import { DateTime } from "luxon";

const plan_add = async (url: string, authUserId: number) => {
  try {
    const added_time = DateTime.now().setZone("Asia/Colombo").toFormat("y-MM-dd HH:mm:ss");

    const result: any = await db.query(
      "INSERT INTO `plan` (url, added_by, added_time) VALUES (?, ?, ?)",
      [url, authUserId, added_time]
    );

    if (result.status) {
      return DefaultResponse.successFormat("200", { insertId: result.data.insertId, url });
    }

    return result;
  } catch (err) {
    logger.error(err);
    return DefaultResponse.errorFormat("500");
  }
};

const plan_list = async () => {
  try {
    const result: any = await db.query("SELECT * FROM `plan` WHERE status != ?", ["deleted"]);
    return result;
  } catch (err) {
    logger.error(err);
    return DefaultResponse.errorFormat("500");
  }
};

const plan_delete = async (id: number) => {
  try {
    const result: any = await db.query("DELETE FROM `plan` WHERE id = ?", [id]);
    if (result.status) return DefaultResponse.successFormat("200", { id });
    return result;
  } catch (err) {
    logger.error(err);
    return DefaultResponse.errorFormat("500");
  }
};

export default {
  plan_add,
  plan_list,
  plan_delete,
};
