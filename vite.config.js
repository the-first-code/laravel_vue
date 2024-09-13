import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    // Плагин Vue будет переписывать URL-адреса ресурсов при их ссылке
                    // в однофайловых компонентах, чтобы указывать на веб-сервер Laravel
                    // Задание значения `null` позволяет плагину Laravel
                    // вместо этого переписывать URL-адреса ресурсов на сервер Vite
                    // вместо этого.
                    base: null,

                    // Плагин Vue будет анализировать абсолютные URL-адреса и считать их
                    // абсолютными путями к файлам на диске. Задание значения
                    // `false` оставит абсолютные URL-адреса нетронутыми, чтобы они могли
                    // ссылаться на ресурсы в общедоступном каталоге, как и ожидалось.
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
