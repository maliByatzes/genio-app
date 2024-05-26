/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.sql(`
insert into country (country_name, updated_at)
select country_name, current_timestamp
from (
    values
    ('Afghanistan', current_timestamp),
    ('Albania', current_timestamp),
    ('Algeria', current_timestamp),
    ('Andorra', current_timestamp),
    ('Angola', current_timestamp),
('Antigua and Barbuda', current_timestamp),
('Argentina', current_timestamp),
('Armenia', current_timestamp),
('Australia', current_timestamp),
('Austria', current_timestamp),
('Azerbaijan', current_timestamp),
('Bahamas', current_timestamp),
('Bahrain', current_timestamp),
('Bangladesh', current_timestamp),
('Barbados', current_timestamp),
('Belarus', current_timestamp),
('Belgium', current_timestamp),
('Belize', current_timestamp),
('Benin', current_timestamp),
('Bhutan', current_timestamp),
('Bolivia', current_timestamp),
('Bosnia and Herzegovina', current_timestamp),
('Botswana', current_timestamp),
('Brazil', current_timestamp),
('Brunei', current_timestamp),
('Bulgaria', current_timestamp),
('Burkina Faso', current_timestamp),
('Burundi', current_timestamp),
('Cabo Verde', current_timestamp),
('Cambodia', current_timestamp),
('Cameroon', current_timestamp),
('Canada', current_timestamp),
('Central African Republic', current_timestamp),
('Chad', current_timestamp),
('Chile', current_timestamp),
('China', current_timestamp),
('Colombia', current_timestamp),
('Comoros', current_timestamp),
('Congo, Democratic Republic of the', current_timestamp),
('Congo, Republic of the', current_timestamp),
('Costa Rica', current_timestamp),
('Croatia', current_timestamp),
('Cuba', current_timestamp),
('Cyprus', current_timestamp),
('Czech Republic', current_timestamp),
('Denmark', current_timestamp),
('Djibouti', current_timestamp),
('Dominica', current_timestamp),
('Dominican Republic', current_timestamp),
('Ecuador', current_timestamp),
('Egypt', current_timestamp),
('El Salvador', current_timestamp),
('Equatorial Guinea', current_timestamp),
('Eritrea', current_timestamp),
('Estonia', current_timestamp),
('Eswatini', current_timestamp),
('Ethiopia', current_timestamp),
('Fiji', current_timestamp),
('Finland', current_timestamp),
('France', current_timestamp),
('Gabon', current_timestamp),
('Gambia', current_timestamp),
('Georgia', current_timestamp),
('Germany', current_timestamp),
('Ghana', current_timestamp),
('Greece', current_timestamp),
('Grenada', current_timestamp),
('Guatemala', current_timestamp),
('Guinea', current_timestamp),
('Guinea-Bissau', current_timestamp),
('Guyana', current_timestamp),
('Haiti', current_timestamp),
('Honduras', current_timestamp),
('Hungary', current_timestamp),
('Iceland', current_timestamp),
('India', current_timestamp),
('Indonesia', current_timestamp),
('Iran', current_timestamp),
('Iraq', current_timestamp),
('Ireland', current_timestamp),
('Israel', current_timestamp),
('Italy', current_timestamp),
('Jamaica', current_timestamp),
('Japan', current_timestamp),
('Jordan', current_timestamp),
('Kazakhstan', current_timestamp),
('Kenya', current_timestamp),
('Kiribati', current_timestamp),
('Kuwait', current_timestamp),
('Kyrgyzstan', current_timestamp),
('Laos', current_timestamp),
('Latvia', current_timestamp),
('Lebanon', current_timestamp),
('Lesotho', current_timestamp),
('Liberia', current_timestamp),
('Libya', current_timestamp),
('Liechtenstein', current_timestamp),
('Lithuania', current_timestamp),
('Luxembourg', current_timestamp),
('Madagascar', current_timestamp),
('Malawi', current_timestamp),
('Malaysia', current_timestamp),
('Maldives', current_timestamp),
('Mali', current_timestamp),
('Malta', current_timestamp),
('Marshall Islands', current_timestamp),
('Mauritania', current_timestamp),
('Mauritius', current_timestamp),
('Mexico', current_timestamp),
('Micronesia', current_timestamp),
('Moldova', current_timestamp),
('Monaco', current_timestamp),
('Mongolia', current_timestamp),
('Montenegro', current_timestamp),
('Morocco', current_timestamp),
('Mozambique', current_timestamp),
('Myanmar', current_timestamp),
('Namibia', current_timestamp),
('Nauru', current_timestamp),
('Nepal', current_timestamp),
('Netherlands', current_timestamp),
('New Zealand', current_timestamp),
('Nicaragua', current_timestamp),
('Niger', current_timestamp),
('Nigeria', current_timestamp),
('North Korea', current_timestamp),
('North Macedonia', current_timestamp),
('Norway', current_timestamp),
('Oman', current_timestamp),
('Pakistan', current_timestamp),
('Palau', current_timestamp),
('Palestine', current_timestamp),
('Panama', current_timestamp),
('Papua New Guinea', current_timestamp),
('Paraguay', current_timestamp),
('Peru', current_timestamp),
('Philippines', current_timestamp),
('Poland', current_timestamp),
('Portugal', current_timestamp),
('Qatar', current_timestamp),
('Romania', current_timestamp),
('Russia', current_timestamp),
('Rwanda', current_timestamp),
('Saint Kitts and Nevis', current_timestamp),
('Saint Lucia', current_timestamp),
('Saint Vincent and the Grenadines', current_timestamp),
('Samoa', current_timestamp),
('San Marino', current_timestamp),
('Sao Tome and Principe', current_timestamp),
('Saudi Arabia', current_timestamp),
('Senegal', current_timestamp),
('Serbia', current_timestamp),
('Seychelles', current_timestamp),
('Sierra Leone', current_timestamp),
('Singapore', current_timestamp),
('Slovakia', current_timestamp),
('Slovenia', current_timestamp),
('Solomon Islands', current_timestamp),
('Somalia', current_timestamp),
('South Africa', current_timestamp),
('South Korea', current_timestamp),
('South Sudan', current_timestamp),
('Spain', current_timestamp),
('Sri Lanka', current_timestamp),
('Sudan', current_timestamp),
('Suriname', current_timestamp),
('Sweden', current_timestamp),
('Switzerland', current_timestamp),
('Syria', current_timestamp),
('Taiwan', current_timestamp),
('Tajikistan', current_timestamp),
('Tanzania', current_timestamp),
('Thailand', current_timestamp),
('Timor-Leste', current_timestamp),
('Togo', current_timestamp),
('Tonga', current_timestamp),
('Trinidad and Tobago', current_timestamp),
('Tunisia', current_timestamp),
('Turkey', current_timestamp),
('Turkmenistan', current_timestamp),
('Tuvalu', current_timestamp),
('Uganda', current_timestamp),
('Ukraine', current_timestamp),
('United Arab Emirates', current_timestamp),
('United Kingdom', current_timestamp),
('United States of America', current_timestamp),
('Uruguay', current_timestamp),
('Uzbekistan', current_timestamp),
('Vanuatu', current_timestamp),
('Vatican City', current_timestamp),
('Venezuela', current_timestamp),
('Vietnam', current_timestamp),
('Yemen', current_timestamp),
('Zambia', current_timestamp),
('Zimbabwe', current_timestamp)
) as new_countries(country_name, updated_at)
where not exists (
    select 1 from country where country.country_name = new_countries.country_name
);
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`
    delete from country
where country_name in (
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo, Democratic Republic of the',
    'Congo, Republic of the',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe'
);
  `);
};
