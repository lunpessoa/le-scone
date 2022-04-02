const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const sass = gulpSass(dartSass);

// compile scss into css
function style() {
  // 1. where is my scss file
  return gulp.src('./assets/scss/**/*.scss')
  // 2. pass that file through sass compiler
    .pipe(sass({outputStyle: 'expanded', sourceComments: true}).on('error', sass.logError))
  // 3. where do I save the compiled CSS?
    .pipe(gulp.dest('./assets/css'))
  // 4. stream change to all browser
    .pipe(browserSync.stream())
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html',
      directory: false
    }
  });
  gulp.watch('./assets/scss/**/*.scss', style);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('./**/*.js').on('change', browserSync.reload);
}

gulp.task('run', () => {
  style();
  watch();
})
