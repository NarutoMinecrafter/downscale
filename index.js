const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Функция для обработки одной картинки
async function processImage(inputPath, outputPath) {
  try {
    // Загружаем исходное изображение с помощью sharp
    const image = sharp(inputPath);

    // Изменяем размер изображения до 50% от оригинального размера
    await image.resize(768).jpeg({ quality: 50 }).toFile(outputPath);

    console.log(`Файл ${inputPath} обработан и сохранен в ${outputPath}`);
  } catch (err) {
    console.error(`Ошибка при обработке файла ${inputPath}`, err);
  }
}

// Функция для обработки всех картинок
async function processImages(inputPaths, outputDir) {
  // Создаем директорию, если ее нет
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Для каждого пути к исходному файлу вызываем функцию для обработки одной картинки
  for (const inputPath of inputPaths) {
    const fileName = path.basename(inputPath);
    const outputPath = path.join(outputDir, fileName);

    await processImage(inputPath, outputPath);
  }
}

// Пример использования функции для обработки всех картинок
const inputDir = path.join(__dirname, "input");
const outputDir = path.join(__dirname, "output");

// Получаем все пути к файлам в директории
const inputPaths = fs
  .readdirSync(inputDir)
  .map((fileName) => path.join(inputDir, fileName));

processImages(inputPaths, outputDir);
