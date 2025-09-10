import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as tmImage from "@teachablemachine/image"; // ✅ Import the package
import skinMessages from "../data/skinMessages.json";

export default function SkinChecker() {
    const webcamRef = useRef(null);
    const modelRef = useRef(null);
    const maxPredictionsRef = useRef(0);

    const [showCamera, setShowCamera] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modelLoaded, setModelLoaded] = useState(false);

    // Load model once using the npm package
    const loadModel = async () => {
        try {
            const URL = "/model/";
            modelRef.current = await tmImage.load(
                URL + "model.json",
                URL + "metadata.json"
            );
            maxPredictionsRef.current = modelRef.current.getTotalClasses();
            setModelLoaded(true);
            console.log("Model loaded successfully");
        } catch (error) {
            console.error("Failed to load model:", error);
        }
    };

    useEffect(() => {
        loadModel();
    }, []);

    const handleCapture = () => {
        if (!webcamRef.current) return;
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
            setPrediction(skinMessages.Invalid);
            return;
        }
        setSelectedImage(imageSrc);
        classifyImage(imageSrc);
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const imageSrc = reader.result;
            setSelectedImage(imageSrc);
            classifyImage(imageSrc);
        };
        reader.readAsDataURL(file);
    };

    const classifyImage = async (imageSrc) => {
        setLoading(true);
        setPrediction(null);
        try {
            const img = new Image();
            img.src = imageSrc;
            img.onload = async () => {
                const predictionResults = await modelRef.current.predict(img);
                const highest = predictionResults.reduce((prev, current) =>
                    prev.probability > current.probability ? prev : current
                );

                if (highest.probability < 0.5) {
                    setPrediction(skinMessages.Invalid);
                } else {
                    setPrediction(skinMessages[highest.className] || skinMessages.Invalid);
                }
                setLoading(false);
            };
        } catch (err) {
            console.error("Prediction error:", err);
            setPrediction(skinMessages.Invalid);
            setLoading(false);
        }
    };

    return (
        <section className="bg-gray-50 py-12 px-4 min-h-screen flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-600">
                Skin Condition Checker
            </h2>

            {!modelLoaded && (
                <p className="text-red-500 mb-4">Loading model, please wait...</p>
            )}

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setShowCamera(!showCamera)}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                    disabled={!modelLoaded || loading}
                >
                    {showCamera ? "Close Camera" : "Open Camera"}
                </button>
                <label className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition cursor-pointer disabled:opacity-50">
                    Upload Image
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUpload}
                        disabled={!modelLoaded || loading}
                    />
                </label>
            </div>

            {showCamera && (
                <div className="mb-4 flex flex-col items-center">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={320}
                        height={240}
                        className="rounded-lg border"
                    />
                    <button
                        onClick={handleCapture}
                        className="mt-2 px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition disabled:opacity-50"
                        disabled={!modelLoaded || loading}
                    >
                        Capture
                    </button>
                </div>
            )}

            {selectedImage && (
                <div className="mb-4">
                    <img src={selectedImage} alt="Uploaded or Captured" className="rounded-lg max-w-xs border" />
                </div>
            )}

            {loading ? (
                <p className="text-gray-600 italic">Analyzing your skin...</p>
            ) : (
                prediction && (
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs text-center border border-gray-200">
                        <div className="text-4xl mb-2">{prediction.emoji}</div>
                        <h3 className="text-xl font-bold mb-2">{prediction.title}</h3>
                        <p className="text-gray-700 whitespace-pre-line">{prediction.message}</p>
                    </div>
                )
            )}
        </section>
    );
}
