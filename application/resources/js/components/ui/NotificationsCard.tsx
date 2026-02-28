import React, { useEffect, useState } from "react";
import { X, Bell, ExternalLink } from "lucide-react";

interface UserInteraction {
    is_viewed: boolean;
    is_dismissed: boolean;
}

interface Notification {
    id: number;
    title: string;
    description?: string;
    image_url?: string;
    redirect_url: string;
    created_at: string;
    user_interactions?: UserInteraction[];
}

const NotificationCard = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/notifications/active", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: Notification[] = await response.json();

            const visibleNotifications = data.filter(notification => {
                const interaction = notification.user_interactions?.[0];
                return !interaction?.is_dismissed;
            });

            setNotifications(visibleNotifications);

            if (visibleNotifications.length > 0) {
                setIsVisible(true);
                setTimeout(() => markAsViewed(visibleNotifications[0].id), 1000);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setError("Failed to load notifications");
        } finally {
            setIsLoading(false);
        }
    };

    const markAsViewed = async (id: number) => {
        try {
            const response = await fetch(`/notifications/${id}/mark-viewed`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Mark as viewed error:", error);
        }
    };

    const handleDismiss = async (id: number) => {
        try {
            const response = await fetch(`/notifications/${id}/dismiss`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Remove from local state
            setNotifications(prev => prev.filter(n => n.id !== id));

            // If there are more notifications, show the next one
            if (notifications.length > 1) {
                const newNotifications = notifications.filter(n => n.id !== id);
                if (currentIndex >= newNotifications.length) {
                    setCurrentIndex(0);
                }
                // Auto-mark next notification as viewed
                if (newNotifications[currentIndex]) {
                    setTimeout(() => markAsViewed(newNotifications[currentIndex].id), 500);
                }
            } else {
                setIsVisible(false);
            }
        } catch (error) {
            console.error("Dismiss error:", error);
            // Still hide from UI even if API call fails
            setNotifications(prev => prev.filter(n => n.id !== id));
            if (notifications.length <= 1) {
                setIsVisible(false);
            }
        }
    };

    const handleNext = () => {
        if (currentIndex < notifications.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            markAsViewed(notifications[newIndex].id);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            markAsViewed(notifications[newIndex].id);
        }
    };

    const handleRedirect = (url: string) => {
        // Mark as viewed before redirecting
        markAsViewed(notifications[currentIndex].id);
        window.open(url, '_blank');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-2xl p-4 border border-gray-200 z-50 animate-pulse">
                <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div className="h-4 bg-gray-200 rounded flex-1"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed bottom-5 right-5 w-80 bg-red-50 border border-red-200 shadow-lg rounded-2xl p-4 z-50">
                <div className="flex items-center space-x-2 text-red-600">
                    <X className="w-5 h-5" />
                    <span className="text-sm">{error}</span>
                </div>
            </div>
        );
    }

    if (!isVisible || notifications.length === 0) return null;

    const notification = notifications[currentIndex];
    const isViewed = notification.user_interactions?.[0]?.is_viewed || false;

    return (
        <div className={`fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-2xl border border-gray-200 z-50 transform transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-medium text-gray-600">
                        Notification {currentIndex + 1} of {notifications.length}
                    </span>
                    {!isViewed && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                </div>
                <button
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => handleDismiss(notification.id)}
                    aria-label="Dismiss notification"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                {notification.image_url && (
                    <div className="mb-3 relative overflow-hidden rounded-lg">
                        <img loading="lazy"
                            src={notification.image_url}
                            alt="Notification"
                            className="w-full h-32 object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {notification.title}
                </h3>

                {notification.description && (
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                        {notification.description}
                    </p>
                )}

                <div className="text-xs text-gray-400 mb-3">
                    {formatDate(notification.created_at)}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                    <button
                        onClick={() => handleRedirect(notification.redirect_url)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                        <span>Learn More</span>
                        <ExternalLink size={14} />
                    </button>

                    {notifications.length > 1 && (
                        <div className="flex space-x-2">
                            <button
                                onClick={handlePrevious}
                                disabled={currentIndex === 0}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 text-xs font-medium py-2 px-3 rounded-lg transition-colors"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentIndex === notifications.length - 1}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 text-xs font-medium py-2 px-3 rounded-lg transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Progress indicator */}
            {notifications.length > 1 && (
                <div className="flex space-x-1 p-3 pt-0">
                    {notifications.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1 flex-1 rounded-full ${index === currentIndex ? 'bg-orange-500' : 'bg-gray-200'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationCard;
