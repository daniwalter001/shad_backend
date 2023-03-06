
const STATUS = {
    BLOCKED: "BLOCKED",
    ACTIVE: "ACTIVE",
    PENDING: "PENDING",
}

const CONSULTATION_STATUS = {
    ONGOING: "ONGOING",
    CLOSED: "CLOSED",
}

const TYPE_ANTECEDENT = {
    FAMILIAL: "FAMILIAL",
    MEDICAL: "MEDICAL",
}

const paths = {
    CS_AUTHORIZATIONS: "uploads/cs/authorizations",
    CS_LOGOS: "uploads/cs/logos",
    SHARED_FILES: "uploads/shared_files",
}

module.exports = {
    STATUS,
    paths,
    CONSULTATION_STATUS,
    TYPE_ANTECEDENT
}
