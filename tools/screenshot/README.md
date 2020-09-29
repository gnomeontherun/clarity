# Screenshot

This is a simple tool that takes a series of screenshots given a list of URLs.

## Usage

By default, it is configured to run against http://localhost:4200.

`node index`

## Options

It is also possible to use project based configuration.

| option | value                    | description                                    |
| ------ | ------------------------ | ---------------------------------------------- |
| type   | `dev`                    | name of the project key                        |
| root   | `../../`                 | root of the repository relative to this script |
| base   | `./references`           | base directory from root for storing images    |
| url    | `http://localhost:4200/` | root url for the project to test               |
