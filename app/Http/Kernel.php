use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

protected $middlewareGroups = [
    'api' => [
        EnsureFrontendRequestsAreStateful::class,
        'throttle:api',
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],
];
