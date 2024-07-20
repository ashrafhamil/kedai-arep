import React from "react";

const ForthSection = () => {
    return (
        <div className="max-w-lg mx-auto p-4 text-black">
            <h2 className="text-2xl font-bold mb-4">Book Your Consultation Date</h2>
            <form className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-950 focus:outline-none focus:bg-indigo-950"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ForthSection;
