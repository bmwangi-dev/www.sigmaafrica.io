<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Primary Meta Tags --}}
    <title inertia>{{ config('app.name') }}</title>
    <meta name="title" content="Sigma Africa - Data-Driven Innovation & Digital Transformation">
    <meta name="description"
        content="Transform your business with Sigma Africa. We offer data science, web development, digital marketing, and business consultancy services across Africa.">
    <meta name="keywords"
        content="data science, digital transformation, web development, business consultancy, Africa, Sigma Africa, analytics, machine learning, digital marketing">
    <meta name="author" content="Sigma Africa">
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">
    <meta name="revisit-after" content="7 days">

    {{-- Canonical URL --}}
    <link rel="canonical" href="{{ url()->current() }}">

    {{-- Open Graph / Facebook --}}
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="Sigma Africa - Data-Driven Innovation & Digital Transformation">
    <meta property="og:description"
        content="Transform your business with Sigma Africa. We offer data science, web development, digital marketing, and business consultancy services across Africa.">
    <meta property="og:image" content="{{ asset('sigma-og-image.png') }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Sigma Africa - Your Growth Partner">
    <meta property="og:site_name" content="Sigma Africa">
    <meta property="og:locale" content="en_US">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{{ url()->current() }}">
    <meta name="twitter:title" content="Sigma Africa - Data-Driven Innovation & Digital Transformation">
    <meta name="twitter:description"
        content="Transform your business with Sigma Africa. We offer data science, web development, digital marketing, and business consultancy services across Africa.">
    <meta name="twitter:image" content="{{ asset('sigma-og-image.png') }}">
    <meta name="twitter:image:alt" content="Sigma Africa - Your Growth Partner">
    {{-- Add your Twitter handle if you have one --}}
    <meta name="twitter:site" content="@sigma_africa">
    <meta name="twitter:creator" content="@sigma_africa">

    {{-- Favicon & App Icons --}}
    <link rel="icon" href="{{ asset('sigmaicon.webp') }}" type="image/webp">
    <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.webp') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.webp') }}">

    {{-- Theme Color for Mobile Browsers --}}
    <meta name="theme-color" content="#0a2540">
    <meta name="msapplication-TileColor" content="#0a2540">

    {{-- Structured Data (JSON-LD) for Organization --}}
    <script type="application/ld+json">
    {
        "@@context": "https://schema.org",
        "@@type": "Organization",
        "name": "Sigma Africa",
        "url": "{{ config('app.url') }}",
        "logo": "{{ asset('sigma-logo.webp') }}",
        "description": "Sigma Africa is a leading data science and digital transformation company dedicated to shaping Africa's data-driven future.",
        "foundingDate": "2022",
        "address": {
            "@@type": "PostalAddress",
            "addressCountry": "KE"
        },
        "sameAs": [
            "https://www.linkedin.com/company/sigmaafrica"
        ],
        "contactPoint": {
            "@@type": "ContactPoint",
            "contactType": "customer service",
            "email": "admin@sigmaafrica.com"
        }
    }
    </script>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    @routes

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
