/* eslint-disable import/no-extraneous-dependencies, no-console */

import gulp from 'gulp';
import babel from 'gulp-babel';
// import eslint from 'gulp-eslint';
import del from 'del';
import { exec } from 'child_process';

const paths = {
  allSrcJs: 'src/**/*.js',
  gulpFile: 'gulpfile.babel.js',
  buildDir: 'build',
};

gulp.task('clean', () => del(paths.buildDir));

gulp.task('build', ['clean'], () =>
  gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.buildDir))
);

gulp.task('main', ['build'], (callback) => {
  exec(`node ${paths.buildDir}`, (error, stdout) => {
    console.log(stdout);
    return callback(error);
  });
});

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);