const db = require("../db/models");

const processMessage = async (kafkaMessage) => {
  if (kafkaMessage.event_name == "tenant_created") {
    await db.TenantProfile.create(kafkaMessage.properties);
  } else if (kafkaMessage.event_name == "user_created") {
    await db.UserProfile.create(kafkaMessage.properties);
  }
};

module.exports = { processMessage };
