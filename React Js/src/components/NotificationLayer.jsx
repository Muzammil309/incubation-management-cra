import React from 'react'

/**
 * SECURITY NOTICE:
 * This component has been updated to use environment variables for all API keys and secrets.
 *
 * CRITICAL SECURITY ACTIONS REQUIRED:
 * 1. IMMEDIATELY rotate all Firebase and Google API keys that were previously exposed
 * 2. Create a .env file with your new API keys (see .env.example)
 * 3. Never commit .env files to version control
 * 4. Use different keys for development, staging, and production environments
 *
 * For key rotation instructions, see: SECURITY_INCIDENT_RESPONSE.md
 */

const NotificationLayer = () => {
    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden">
            <div className="card-body p-40">
                <form action="#">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="mb-20">
                                <label
                                    htmlFor="firebaseSecretKey"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    Firebase secret key
                                </label>
                                <input
                                    type="text"
                                    className="form-control radius-8"
                                    id="firebaseSecretKey"
                                    placeholder="Firebase secret key"
                                    defaultValue={process.env.REACT_APP_FIREBASE_SERVER_KEY || ""}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-20">
                                <label
                                    htmlFor="firebasePublicVapidKey"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    Firebase public vapid key (key pair)
                                </label>
                                <input
                                    type="text"
                                    className="form-control radius-8"
                                    id="firebasePublicVapidKey"
                                    placeholder="Firebase public vapid key (key pair)"
                                    defaultValue={process.env.REACT_APP_FIREBASE_VAPID_KEY || ""}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-20">
                                <label
                                    htmlFor="firebaseAPIKey"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    Firebase API Key
                                </label>
                                <input
                                    type="text"
                                    className="form-control radius-8"
                                    id="firebaseAPIKey"
                                    placeholder="Firebase  API Key"
                                    defaultValue={process.env.REACT_APP_FIREBASE_API_KEY || ""}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-20">
                                <label
                                    htmlFor="firebaseAuthDomain"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    Firebase AUTH Domain
                                </label>
                                <input
                                    type="text"
                                    className="form-control radius-8"
                                    id="firebaseAuthDomain"
                                    placeholder="Firebase  AUTH Domain"
                                    defaultValue={process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || ""}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-20">
                                <label
                                    htmlFor="firebaseProjectID"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    Firebase Project ID
                                </label>
                                <input
                                    type="text"
                                    className="form-control radius-8"
                                    id="firebaseProjectID"
                                    placeholder="Firebase Project ID"
                                    defaultValue={process.env.REACT_APP_FIREBASE_PROJECT_ID || ""}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-20">
                                <label
                                    htmlFor="firebaseStorageBucket"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    Firebase Storage Bucket
                                </label>
                                <input
                                    type="text"
                                    className="form-control radius-8"
                                    id="firebaseStorageBucket"
                                    placeholder="Firebase Storage Bucket"
                                    defaultValue={process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || ""}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-20">
                                <label
                                    htmlFor="firebaseMessageSenderID"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    Firebase Message Sender ID
                                </label>
                                <input
                                    type="text"
                                    className="form-control radius-8"
                                    id="firebaseMessageSenderID"
                                    placeholder="Firebase  Message Sender ID"
                                    defaultValue={process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || ""}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-20">
                                <label
                                    htmlFor="firebaseAppID"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    Firebase App ID
                                </label>
                                <input
                                    type="text"
                                    className="form-control radius-8"
                                    id="firebaseAppID"
                                    placeholder="Firebase  App ID"
                                    defaultValue={process.env.REACT_APP_FIREBASE_APP_ID || ""}
                                />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="mb-20">
                                <label
                                    htmlFor="firebaseMeasurmentID"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    Firebase Measurement ID
                                </label>
                                <input
                                    type="text"
                                    className="form-control radius-8"
                                    id="firebaseMeasurmentID"
                                    placeholder="Firebase  Measurement ID"
                                    defaultValue={process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || ""}
                                />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
                            <button
                                type="reset"
                                className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary border border-primary-600 text-md px-24 py-12 radius-8"
                            >
                                Save Change
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default NotificationLayer