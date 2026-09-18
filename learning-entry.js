(function (scope) {
    function resolveLearningEntry(search, launchedFromTask) {
        if (launchedFromTask) return "dashboard";
        return new URLSearchParams(search).get("entry") === "grammar"
            ? "grammar-map"
            : "dashboard";
    }

    scope.resolveLearningEntry = resolveLearningEntry;
})(typeof window === "undefined" ? globalThis : window);
