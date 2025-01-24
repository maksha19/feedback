import React, { useState } from "react";
import axios from "axios";
import { QRCodeSVG } from 'qrcode.react';
const FeedbackForm: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [club, setClub] = useState("");
    const [rating, setRating] = useState("");
    const [performance, setPerformance] = useState("");
    const [highlights, setHighlights] = useState("");
    const [suggestions, setSuggestions] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedbackSaved, setFeedbacksSaved] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        if (type === "radio") {
            setRating(value);

        } else if (name === "highlights") {
            setHighlights(value);
        } else if (name === "suggestions") {
            setSuggestions(value);
        } else {
            if (name === "name") setName(value);
            if (name === "email") setEmail(value);
            if (name === "mobile") setMobile(value);
            if (name === "club") setClub(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ name, email, mobile, club, rating, highlights, suggestions, performance });
        setIsSubmit(true);
        const url = "https://script.google.com/macros/s/AKfycbxKeOi-Ojk_h9iFXE-p-94dUx0r6XRVm9RnzN2UxY-ailPXYCDXg-ip3jiN09ttI1kKRA/exec"
        const response = await axios.post(
            url,
            { name, email, mobile, club, rating, highlights, suggestions, performance },
            {
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
            }
        );
        if (response.status === 200) {
            const statusCode = response.data.statusCode;
            if (statusCode === "202") {
                setFeedbacksSaved(true);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {
                feedbackSaved ?
                    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg space-y-6">
                        <h2 className="text-3xl font-bold text-center text-blue-600">Hi {name} !</h2>
                        <div className="flex justify-center">
                            <QRCodeSVG
                                value={mobile}
                                size={300}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="Q"
                                marginSize={4}
                            />
                        </div>
                        <p className="text-center text-blue-600">Thank you for submitting your feedback! Please present this QR code at the registration table to record your 2nd attendance.</p>
                    </div> :
                    <>
                        <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg space-y-6">
                            <h2 className="text-2xl font-bold text-center text-blue-600">Toastmasters Leadership Institute (TLI) - Club Officer Training (COT2) - Survey</h2>
                            <p className="text-center text-gray-600">We value your feedback. Please share your thoughts below!</p>

                            {/* Name Field */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-gray-700 font-medium">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-gray-700 font-medium">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Mobile Field */}
                            <div className="space-y-2">
                                <label htmlFor="mobile" className="block text-gray-700 font-medium">
                                    Your Mobile
                                </label>
                                <input
                                    type="number"
                                    id="mobile"
                                    name="mobile"
                                    value={mobile}
                                    onChange={handleChange}
                                    placeholder="Enter your mobile number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Club Field */}
                            <div className="space-y-2">
                                <label htmlFor="club" className="block text-gray-700 font-medium">
                                    Your Club(s)
                                </label>
                                <textarea
                                    id="club"
                                    name="club"
                                    value={club}
                                    onChange={handleChange}
                                    placeholder="Enter your club name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Rating Field */}
                            <div className="space-y-2">
                                <p className="text-gray-700 font-medium">
                                    Overall, how would you rate your experience for this TLI-COT2?
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {["Excellent", "Good", "Fair", "Poor"].map((option) => (
                                        <label
                                            key={option}
                                            className="flex items-center gap-2 text-gray-700 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={option}
                                                checked={rating === option}
                                                onChange={handleChange}
                                                className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-700 font-medium">
                                    Do you think you can improve the performance of your club with what you have gained from this session?
                                </p>
                                <div className="space-y-2">
                                    {[
                                        "Already Achived",
                                        "Yes",
                                        "No",
                                        "Maybe"
                                    ].map((option, index) => (
                                        <label
                                            key={option}
                                            className="flex items-center gap-2 text-gray-700 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                name="performance" // Grouping all options under the same name
                                                value={option}
                                                checked={performance === option}
                                                onChange={(e) => setPerformance(e.target.value)} // Update state for selected option
                                                className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>


                            {/* Highlights Field */}
                            <div className="space-y-2">
                                <label htmlFor="highlights" className="block text-gray-700 font-medium">
                                    What were the highlights of the event for you?
                                </label>
                                <textarea
                                    id="highlights"
                                    name="highlights"
                                    value={highlights}
                                    onChange={handleChange}
                                    placeholder="Share the most memorable aspects of the event..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                    required
                                />
                            </div>

                            {/* Suggestions Field */}
                            <div className="space-y-2">
                                <label htmlFor="suggestions" className="block text-gray-700 font-medium">
                                    What suggestions do you have for improving future events?
                                </label>
                                <textarea
                                    id="suggestions"
                                    name="suggestions"
                                    value={suggestions}
                                    onChange={handleChange}
                                    placeholder="Share your thoughts on how we can do better..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                                    disabled={isSubmit}
                                >
                                    {isSubmit ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Feedback"
                                    )}
                                </button>
                            </div>
                        </form></>
            }


        </div>
    );
};

export default FeedbackForm;
