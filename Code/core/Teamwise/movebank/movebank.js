import * as R from "./ocpuCalls.js";

/** Error message when the login failed due to a wrong name or password. */
const BAD_LOGIN = "It seems like your username or password is wrong.";

/** API error message if no data could be downloaded for a study. */
const NO_DATA_AVAILABLE = "Api reports: No data are available for download";

/** Error message when accessing the movebank without being logged in. */
const NOT_LOGGED_IN = "Please log in with your Movebank account first.";

/** API error message if permission to the data was denied. */
const PERMISSION_DENIED = "It looks like you are not allowed to download this";

/**
 * A wrapper class for entries in the table of individuals in the Movebank.
 */
class Animal {
    /**
     * Creates a new Animal.
     * @param {Object} animal the animal data
     * @param {number} animal.id the identifier of the animal
     */
    constructor(animal) {
        if (!animal.id) {
            throw "Animal id is not defined.";
        }
        this._data = animal;
    }

    /**
     * Additional information about the animal that is not described by other
     * reference data terms.
     * @type {string}
     */
    get comments() {
        return this._data.comments;
    }

    /**
     * Comments about the death of the animal.
     * @type {string}
     */
    get death_comments() {
        return this._data.death_comments;
    }

    /**
     * The earliest date an animal is thought to have been born.
     * @type {string}
     */
    get earliest_date_born() {
        return asIso8601(this._data.earliest_date_born);
    }

    /**
     * The exact date on which animal was born.
     * @type {string}
     */
    get exact_date_of_birth() {
        return asIso8601(this._data.exact_date_of_birth);
    }

    /**
     * The global identifier of this indiviual in the Movebank.
     * @type {number}
     */
    get id() {
        return this._data.id;
    }

    /**
     * The latest date an animal is thought to have been born.
     * @type {string}
     */
    get latest_date_born() {
        return asIso8601(this._data.latest_date_born);
    }

    /**
     * An individual identifier for the animal, provided by the data owner.
     *
     * This identifier can be a ring number, a name, the same as the associated
     * tag ID, etc. If the data owner does not provide an Animal ID, an internal
     * Movebank animal identifier may sometimes be shown.
     * @type {string}
     */
    get local_identifier() {
        return this._data.local_identifier;
    }

    /**
     * An alternate identifier for the animal.
     *
     * Used as the display name for animals shown in the Animal Tracker App.
     * @type {string}
     */
    get nick_name() {
        return this._data.nick_name;
    }

    /**
     * A number or color scheme for a band or ring attached to the animal.
     * @type {number|string}
     */
    get ring_id() {
        return this._data.ring_id;
    }

    /**
     * The sex of the biological individual(s) represented in the occurrence.
     *
     * - `"m"`: male
     * - `"f"`: female
     * @type {string}
     */
    get sex() {
        return this._data.sex;
    }

    /**
     * The scientific name of the species on which the tag was deployed, as
     * defined by the Integrated Taxonomic Information System (ITIS,
     * www.itis.gov).
     *
     * If the species name can not be provided, this should be the lowest level
     * taxonomic rank that can be determined and that is used in the ITIS
     * taxonomy.
     * @type {string}
     */
    get taxon_canonical_name() {
        return this._data.taxon_canonical_name;
    }
}


/**
 * A wrapper class for information of the deployment of tags on an animal.
 */
class Deployment {
    /**
     * Creates a new Deployment.
     * @param {Object} deployment the deployment data
     */
    constructor(deployment) {
        this._data = deployment;
    }

    /**
     * The age class or life stage of the animal at the beginning of the
     * deployment.
     *
     * Can be years or months of age or terms such as "adult", "subadult" and
     * "juvenile". Units should be defined in the values (e.g. "2 years").
     * @type {string}
     */
    get animal_life_stage() {
        return this._data.animal_life_stage;
    }

    /**
     * The mass of an the animal (in grams).
     * @type {number}
     */
    get animal_mass() {
        return this._data.animal_mass;
    }

    /**
     * The reproductive condition of the animal at the beginning of the
     * deployment.
     * @type {string}
     */
    get animal_reproductive_condition() {
        return this._data.animal_reproductive_condition;
    }

    /**
     * The way a tag is attached to an animal.
     *
     * - `"collar"`: The tag is attached by a collar around the animal's neck.
     * - `"glue"`: The tag is attached to the animal using glue.
     * - `"harness"`: The tag is attached to the animal using a harness.
     * - `"implant"`: The tag is placed under the skin of the an animal.
     * - `"tape"`: The tag is attached to the animal using tape.
     * - `"other"`: user specified
     * @type {string}
     */
    get attachment_type() {
        return this._data.attachment_type;
    }

    /**
     * A description of behavioral categories in the data set and/or how they
     * were derived.
     * @type {string}
     */
    get behavior_according_to() {
        return this._data.behavior_according_to;
    }

    /**
     * Additional information about the tag deployment that is not described by
     * other reference data terms.
     * @type {string}
     */
    get comments() {
        return this._data.comments;
    }

    /**
     * Name of the software program/s, scripts, etc. used to process raw sensor
     * data and derive location estimates.
     * @type {string}
     */
    get data_processing_software() {
        return this._data.data_processing_software;
    }

    /**
     * The geographic location where the deployment ended (intended primarily
     * for instances in which the animal release and tag retrieval locations
     * have higher accuracy than those derived from sensor data).
     * @type {Cesium.Cartesian3}
     */
    get deploy_off_location() {
        const long = this._data.deploy_off_longitude;
        const lat = this._data.deploy_off_latitude;
        if (long && lat) {
            return Cesium.Cartesian3.fromDegrees(long, lat);
        } else {
            return undefined;
        }
    }

    /**
     * The name of the person/people who removed the tag from the animal and
     * ended the deployment.
     * @type {string}
     */
    get deploy_off_person() {
        return this._data.deploy_off_person;
    }

    /**
     * The timestamp when the tag deployment ended.
     * @type {string}
     */
    get deploy_off_timestamp() {
        return asIso8601(this._data.deploy_off_timestamp);
    }

    /**
     * The geographic location where the animal was released (intended primarily
     * for instances in which the animal release and tag retrieval locations
     * have higher accuracy than those derived from sensor data)
     * @type {Cesium.Cartesian3}
     */
    get deploy_on_location() {
        const long = this._data.deploy_on_longitude;
        const lat = this._data.deploy_on_latitude;
        if (long && lat) {
            return Cesium.Cartesian3.fromDegrees(long, lat);
        } else {
            return undefined;
        }
    }

    /**
     * The name of the person/people who attached the tag to the animal and
     * began the deployment.
     * @type {string}
     */
    get deploy_on_person() {
        return this._data.deploy_on_person;
    }

    /**
     * The timestamp when the tag deployment started.
     * @type {string}
     */
    get deploy_on_timestamp() {
        return asIso8601(this._data.deploy_on_timestamp);
    }

    /**
     * A description of the end of a tag deployment, such as cause of mortality
     * or notes on the removal and/or failure of tag.
     * @type {string}
     */
    get deployment_end_comments() {
        return this._data.deployment_end_comments;
    }

    /**
     * A categorical classification of the tag deployment end.
     *
     * - `"captured"`: The tag remained on the animal but the animal was
     *     captured or confined.
     * - `"dead"`: The deployment ended with the death of the animal that was
     *     carrying the tag.
     * - `"equipment failure"`: The tag stopped working.
     * - `"fall off"`: The attachment of the tag to the animal failed, and it
     *     fell off accidentally.
     * - `"other"`
     * - `"released"`: The tag remained on the animal but the animal was
     *     released from captivity or confinement.
     * - `"removal"`: The tag was purposefully removed from the animal.
     * - `"unknown"`: The deployment ended by an unknown cause.
     * @type {string}
     */
    get deployment_end_type() {
        return this._data.deployment_end_type;
    }

    /**
     * Remarks associated with the duty cycle of a tag during the deployment,
     * describing the times it is on/off and the frequency at which it transmits
     * or records data.
     * @type {string}
     */
    get duty_cycle() {
        return this._data.duty_cycle;
    }

    /**
     * A description of how solar geolocators were calibrated.
     * @type {string}
     */
    get geolocator_calibration() {
        return this._data.geolocator_calibration;
    }

    /**
     * The light threshold used for location estimation with solar geolocators.
     * @type {number}
     */
    get geolocator_light_threshold() {
        return this._data.geolocator_light_threshold;
    }

    /**
     * Description of light and other sensors, e.g. range of light intensity,
     * light spectra (nm), that is not described by other reference data terms.
     * @type {string}
     */
    get geolocator_sensor_comments() {
        return this._data.geolocator_light_threshold;
    }

    /**
     * The sun elevation angle used for location estimation with solar
     * geolocators (in degrees).
     * @type {number}
     */
    get geolocator_sun_elevation_angle() {
        return this._data.geolocator_sun_elevation_angle;
    }

    /**
     * A description of habitat categories in the data set, how they were
     * derived, and/or a reference to indicate which habitat classification
     * system was used.
     * @type {string}
     */
    get habitat_according_to() {
        return this._data.habitat_according_to;
    }

    /**
     * A unique identifier for the deployment of a tag on animal, provided by
     * the data owner. If the data owner does not provide a Deployment ID, an
     * internal Movebank deployment identifier may sometimes be shown.
     * @type {number}
     */
    get id() {
        return this._data.id;
    }

    /**
     * ???
     * @type {string}
     */
    get local_identifier() {
        return this._data.local_identifier;
    }

    /**
     * Comments about the location error estimate values provided using location
     * error text, location error numerical, and/or vertical error numerical.
     *
     * The percentile uncertainty can be provided using location error
     * percentile.
     * @type {string}
     */
    get location_accuracy_comments() {
        return this._data.location_accuracy_comments;
    }

    /**
     * Additional comments about the way in which the animal was manipulated
     * during the deployment. Use manipulation type to define the general type
     * of manipulation.
     * @type {string}
     */
    get manipulation_comments() {
        return this._data.manipulation_comments;
    }

    /**
     * The way in which the animal was manipulated during the deployment.
     *
     * - `"confined"`: The animal's movement was restricted to within a defined
     *     area.
     * - `"none"`: The animal received no treatment other than the tag
     *     attachment.
     * - `"relocated"`: The animal was released from a site other than the one
     *     at which it was captured.
     * - `"manipulated other"`: The animal was manipulated in some other way,
     *     such as a physiological manipulation.
     *
     * Additional details about the manipulation can be provided using
     * {@link manipulation_comments}.
     * @type {string}
     */
    get manipulation_type() {
        return this._data.manipulation_type;
    }

    /**
     * ???
     * @type {string}
     */
    get partial_identifier() {
        return this._data.partial_identifier;
    }

    /**
     * The name of the deployment site, for example a field station or colony.
     * @type {string}
     */
    get study_site() {
        return this._data.study_site;
    }

    /**
     * The way the data are received from the tag.
     *
     * - `"satellite"`: Data are transferred via satellite.
     * - `"phone network"`: Data are transferred via a phone network, such as
     *     GSM or AMPS.
     * - `"other wireless"`: Data are transferred via another form of wireless
     *     data transfer, such as a VHF radio transmitter/receiver.
     * - `"tag retrieval"`: The tag must be physically retrieved in order to
     *     obtain the data.
     * @type {string}
     */
    get tag_readout_method() {
        return this._data.tag_readout_method;
    }
}


/**
 * A wrapper class for meta and tracking data of studies stored in the Movebank.
 *
 * Provides functions to load animal meta and tracking data.
 */
class MovebankStudy {
    /**
     * Creates a new MovebankStudy.
     * @param {Object} study the study meta data as stored in the Movebank
     * @param {number} study.id the Movebank identifier of this study
     * @param {string} study.name the name of this study
     */
    constructor(study) {
        /** The list of animals in this study. */
        this._animals = null;

        /** The references to the R object holding the data of an animal. */
        this._animalData = new Cesium.AssociativeArray();

        /** The list of deployments associated with an animal. */
        this._deployments = new Cesium.AssociativeArray();

        /** Holds the actual study information. */
        this._study = study;

        /** Flag to set after a download attempt with the respective message. */
        this._noDataAvailable = false;
    }

    /**
     * Acknowledgements for the study.
     *
     * These can include institutions that provided funding or site access
     * and the names of field assistants, collaborators, etc.
     * @type {string}
     */
    get acknowledgements() {
        return this._study.acknowledgements;
    }

    /**
     * A citation for the study.
     *
     * If the data are equivalent to those in a published study, the existing
     * publication can be cited. If the data have not been published, an
     * "unpublished data" or "in progress" citation should be used, listing
     * authors and a title for the data set.
     * @type {string}
     */
    get citation() {
        return this._study.citation;
    }

    /**
     * ???
     */
    get enable_for_animal_tracker() {
        return this._study.enable_for_animal_tracker;
    }

    /**
     * A list or description of grants used to fund the research.
     * @type {string}
     */
    get grants_used() {
        return this._study.grants_used;
    }

    /**
     * ???
     * @type {boolean}
     */
    get has_quota() {
        return this._study.has_quota === "true";
    }

    /**
     * Whether the user that loaded the study is the study administrator.
     * @type {boolean}
     */
    get i_am_owner() {
        return this._study.i_am_owner === "true";
    }

    /**
     * Whether the user that loaded the study is able to see some data.
     * @type {boolean}
     */
    get i_can_see_data() {
        return this._study.i_can_see_data === "true";
    }

    /**
     * The unique identifier of this study as stored in the Movebank.
     * @type {number}
     */
    get id() {
        return this._study.id;
    }

    /**
     * Terms of use for the data in the study, provided by the study owner.
     *
     * If no license terms are specified, the [General Movebank Terms of
     * Use](https://www.movebank.org/node/1934) apply.
     * @type {string}
     */
    get license_terms() {
        return this._study.license_terms;
    }

    /**
     * A reference location for the study chosen by the data owner that is used
     * as the location for the study marker shown on the Movebank map.
     *
     * This location can represent a colony, homing location, deployment site,
     * resesarch institute location, or other location relevant to the study.
     * @type {Cesium.Cartesian3}
     */
    get main_location() {
        const long = this._study.main_location_long;
        const lat = this._study.main_location_lat;
        return Cesium.Cartesian3.fromDegrees(long, lat);
    }

    /**
     * The name of the study in Movebank in which data are stored.
     * @type {string}
     */
    get name() {
        return this._study.name;
    }

    /**
     * Indicates that there is no data to download for this study.
     * @type {boolean}
     */
    get no_data_available() {
        return this._noDataAvailable;
    }

    /**
     * The address of the {@link MovebankStudy#principal_investigator_name}.
     * @type {string}
     */
    get principal_investigator_address() {
        return this._study.principal_investigator_address;
    }

    /**
     * The email of the {@link MovebankStudy#principal_investigator_name}.
     * @type {string}
     */
    get principal_investigator_email() {
        return this._study.principal_investigator_email;
    }

    /**
     * The principal investigator (PI) or lead researcher for the study.
     *
     * This can be a Movebank user, or information for non-registered PIs
     * or multiple PIs can be provided manually.
     * @type {string}
     */
    get principal_investigator_name() {
        return this._study.principal_investigator_name;
    }

    /**
     * A brief description of the study objectives, methods, and results.
     * @type {string}
     */
    get study_objective() {
        return this._study.study_objective;
    }

    /**
     * The category of Movebank entry, e.g. "research".
     * @type {string}
     */
    get study_type() {
        return this._study.study_type;
    }

    /**
     * ???
     * @type {boolean}
     */
    get suspend_license_terms() {
        return this._study.suspend_license_terms === "true";
    }

    /**
     * Whether the study contains data that is not visible to this user.
     * @type {boolean}
     */
    get there_are_data_which_i_cannot_see() {
        return this._study.there_are_data_which_i_cannot_see === "true";
    }

    /**
     * The timestamp when the study ended.
     * @type {string}
     */
    get timestamp_end() {
        return asIso8601(this._study.timestamp_end);
    }

    /**
     * The timestamp when the study was started.
     * @type {string}
     */
    get timestamp_start() {
        return asIso8601(this._study.timestamp_start);
    }

    /**
     * Returns or fetches and stores the list of animals of this study.
     * @param {Movebank} account a valid Movebank login
     * @returns {Promise<Array<Animal>>} the animal list of this study
     */
    async getAnimals(account) {
        // If the data is already cached, just return it.
        let animals = this._animals;

        if (!animals) {
            // Request the list of animals to this study from the Movebank.
            // In case of success, the result will hold a promise to an array of
            // animals with the data from the answered request.
            // If anything fails, a rejected promise with the error message
            // (e.g. "permission denied" or "no data available") is returned.
            animals = R.loadAnimals(this.id, account.loginData).then(data =>
                // Download succeeded, resolve the promise with a new animal
                // object for every entry in the loaded data.
                data.map(a => new Animal(a))
            );

            // Cache the result for future requests.
            this._animals = animals;

            // Check whether the request succeeded, possibly delete the cache.
            try {
                await animals;
            } catch (error) {
                // Delete the cached error for cases like "permission denied",
                // as this might change after little time (user accepts license
                // agreement) and retry on the next call.
                // If there is no data, this will probably not change right now.
                if (error.message.startsWith(NO_DATA_AVAILABLE)) {
                    this._noDataAvailable = true;
                } else {
                    this._animals = null;
                }
            }
        }

        return animals;
    }

    /**
     * Returns or loads and stores the move object of an animal in this study.
     * @param {number} animalId the identifier of the animal
     * @param {Movebank} account the Movebank login to use
     * @returns {Promise<R.Session>} the data of this animal
     */
    async getMoveObj(animalId, account) {
        let data = this._animalData.get(animalId);

        if (!data) {
            data = R.loadData(this.id, animalId, account.loginData);
            // Indicate that there is already a pending request.
            this._animalData.set(animalId, data);

            // Do not cache the data if the download failed.
            try {
                await data;
            } catch (error) {
                this._animalData.remove(animalId);
            }
        }

        return data;
    }

    /**
     * Returns the actual (movement) data of the given animal.
     * @param {number} animalId the identifier of the animal
     * @param {Movebank} account the Movebank login to use
     * @returns {Promise<Array<Object>>} the data to the study and animal
     */
    async getData(animalId, account) {
        const moveObj = await this.getMoveObj(animalId, account);
        return R.extractData(moveObj);
    }

    /**
     * Creates a data source from the animal data.
     * @param {Array<Animal>} animals the animals to load
     * @param {Movebank} account the reference to the Movebank login
     * @returns {Promise<Cesium.DataSource>} the created data source
     */
    async loadDataSource(animals, account) {
        if (animals.length === 0) {
            return Promise.reject("Animals is empty.");
        }

        // Load the data and create an entitity for every given animal.
        // Go on after all entities are created.
        const entities = await Promise.all(
            animals.map(async animal => {
                const data = await this.getData(animal.id, account);
                return createEntity(data, animal.id, animal.local_identifier);
            })
        );

        // Build the data source from the created entites.
        return createDataSource(this.name, entities);
    }

    /**
     * Returns the deployments that are associated with a given animal.
     * @param {number} animalId the identifier of the animal
     * @param {Movebank} account a valid Movebank account
     * @returns {Promise<Array<Deployment>>} the list of deployments
     */
    async getDeployments(animalId, account) {
        // If the data is already cached, just return it.
        let deployments = this._deployments.get(animalId);

        if (!deployments) {
            // Request the list of deployments to this study from the Movebank.
            // In case of success, the result will hold a promise to an array of
            // deployments with the data from the answered request.
            // If anything fails, a rejected promise with the error message
            // (e.g. "permission denied" or "no data available") is returned.
            deployments = R.loadDeployments(
                this.id, animalId, account.loginData
            ).then(data =>
                // Download succeeded, resolve the promise with a new deployment
                // object for every entry in the loaded data.
                data.map(d => new Deployment(d))
            );

            // Cache the result for future requests.
            this._deployments.set(animalId, deployments);

            // Check whether the request succeeded.
            try {
                await deployments;
            } catch (error) {
                // Delete the cached error.
                if (error) {
                    this._deployments.remove(animalId);
                }
            }
        }

        return deployments;
    }
}


/**
 * The access to the Movebank.
 *
 * Holds the login data and the list of studies, as these contain user dependent
 * meta information.
 */
class Movebank {

    /**
     * Creates a new Movebank object.
     */
    constructor() {
        this._loginData = null;
        this._studies = null;
    }

    /**
     * The Movebank login information that is used for download attempts.
     * @type {R.Session}
     * @throws when accessing whithout being logged in
     */
    get loginData() {
        if (this._loginData) {
            return this._loginData;
        } else {
            throw new Error(NOT_LOGGED_IN);
        }
    }

    /**
     * The list of all studies in the Movebank.
     *
     * This requires to be logged in first.
     * @type {Array<MovebankStudy>}
     * @throws when accessing whithout being logged in
     */
    get studies() {
        if (this._studies) {
            return this._studies;
        } else {
            throw new Error(NOT_LOGGED_IN);
        }
    }

    /**
     * Log in to Movebank.
     *
     * This also loads the list of stored studies, thus validating the login.
     * @param {string} username the Movebank username
     * @param {string} password the Movebank password
     */
    async login(username, password) {
        try {
            // Create the acount. It just holds the login data, no validation.
            const account = await R.createLogin(username, password);

            // Load the study list, this also validates the login.
            const studyData = await R.loadAllStudies(account);

            // Create a study object for every Movebank entry and sort by name.
            const studies = studyData.map(study => new MovebankStudy(study));
            studies.sort((a, b) => a.name.localeCompare(b.name));

            // Save the created account data and study information.
            this._loginData = account;
            this._studies = studies;
        } catch (error) {
            let reason;
            if (error.message.startsWith(PERMISSION_DENIED)) {
                // Loading the study list is possible for every valid account,
                // so the login data must be wrong.
                reason = BAD_LOGIN;
            } else {
                // TODO catch html error text when server is unavailable
                reason = "Login failed for unknown reasons:\n" + error.message;
            }
            throw new Error(reason);
        }
    }

    /**
     * Log out from Movebank.
     *
     * This invalidates the loginData and deletes the study list.
     * It has to be reloaded by logging in again.
     */
    logout() {
        this._loginData = null;
        this._studies = null;
    }
}


/**
 * Convert a datetime string of the format "yyyy-MM-dd HH:mm:ss(.s)" to ISO8601.
 *
 * The function accepts an arbitrary number of decimals for the "seconds" part.
 * Timestamps are assumed to be in UTC and must not contain a time zone offset.
 * Timestamps that are already in ISO8601 are returned unmodified.
 * @param {string} timestamp a correctly formatted UTC-datetime string
 * @returns {string} the timestamp as ISO8601
 */
function asIso8601(timestamp) {
    // These do not check against all invalid input but will find most errors.
    const isoFormat = /^[0-9]{4}-[01][0-9]-[0-3][0-9]T[0-2][0-9](:[0-5][0-9]){2}(\.[0-9]+)?Z$/;
    const posixFormat = /^[0-9]{4}-[01][0-9]-[0-3][0-9] [0-2][0-9](:[0-5][0-9]){2}(\.[0-9]+)?$/;

    // Do nothing if the given string is already in ISO8601.
    if (isoFormat.test(timestamp)) {
        return timestamp;
    }

    // The string is in a format that cannot be transformed.
    if (!posixFormat.test(timestamp)) {
        throw new Error("Bad format in timestamp: " + timestamp);
    }

    const dateFormatLength = 10; // "yyyy-MM-dd".length
    const date = timestamp.slice(0, dateFormatLength);
    // Consider the additional whitespace!
    const time = timestamp.slice(dateFormatLength + 1);

    return date + "T" + time + "Z";
}


/**
 * Creates a data source containing the given entities.
 * @param {string} name the name to give the data source
 * @param {Array<Cesium.Entity>} entities the entities to add to the data source
 * @returns {Cesium.DataSource} the created data source
 */
function createDataSource(name, entities) {
    // Set the colors for the trajectories.
    entities.forEach((entity, index) => {
        // Distributing the animal paths evenly across the HSL color range.
        const hue = index / entities.length;
        const sat = 1.0;
        const light = 0.5;
        entity.path.material = Cesium.Color.fromHsl(hue, sat, light);
    });

    // Create a clock for the data source.
    const clock = new Cesium.DataSourceClock();

    // Assemble the new data source.
    const dataSource = new Cesium.CustomDataSource(name);
    dataSource.clock = clock;
    entities.forEach(e => dataSource.entities.add(e));

    // Set the clock's start to the earliest start time of the entities.
    // Set the clock's stop to the latest stop time of the entities.
    const totalAvailability = dataSource.entities.computeAvailability();
    clock.startTime = totalAvailability.start;
    clock.stopTime = totalAvailability.stop;

    // Set the clock to its just calculated start and let it loop.
    clock.currentTime = clock.startTime;
    clock.clockRange = Cesium.ClockRange.LOOP_STOP;

    return dataSource;
}


/**
 * Creates an entity from the given data, which is an array of records with:
 * - `location_long`, `location_lat`: the geographic location in degrees
 * - `height_above_ellipsoid`, `argos_altitude`: the height above the ellipsoid,
 *     only the first available value is used. If no value is given, the entity
 *     is assumed to be on the earth's surface.
 * - `timestamp`: the timstamp of the record in either ISO8601 or POSIX
 *     ("yyyy-MM-DD HH:mm:ss.sss") format
 *
 * @param {Object[]} data the data to create the entity from
 * @param {string} data[].timestamp the timestamp, in POSIX or ISO8601 format
 * @param {number} data[].location_long the geographic longitude, in degrees
 * @param {number} data[].location_lat the geographic latitude, in degrees
 * @param {number} [data[].height_above_ellipsoid] the height, in meters
 * @param {number} [data[].argos_altitude] the height, in meters
 * @param {number} [id] the id to be given to the entity, optional
 * @param {string} [name] the name of the entitiy, optional
 * @returns {Promise<Cesium.Entity>} the new entity
 */
function createEntity(data, id, name) {
    // Extract the timestamp data.
    const times = data.map(p =>
        // Timestamps are POSIXct-like format and must be transformed twice.
        Cesium.JulianDate.fromIso8601(asIso8601(p.timestamp))
    );

    // Define the overall time interval in which the entity holds data.
    const startStopInterval = new Cesium.TimeIntervalCollection([
        // This holds exactly one interval, from the first to last timestamp.
        new Cesium.TimeInterval({
            start: times[0],
            stop: times[times.length - 1]
        })
    ]);

    // Extract the position data.
    const locations = data.map(p => Cesium.Cartesian3.fromDegrees(
        p.location_long,
        p.location_lat,
        // TODO extend this list?
        // Choose the first height information that is available.
        p.height_above_ellipsoid || p.argos_altitude
    ));

    // Merge positions and timestamps into one continuous property.
    const posPerTime = new Cesium.SampledPositionProperty();
    posPerTime.addSamples(times, locations);

    // Create the new entity from the data.
    const entity = new Cesium.Entity({
        id: id,
        position: posPerTime,
        availability: startStopInterval,
        // TODO: nicer path, draw a path at all?
        path: {
            leadTime: 0
        }
    });
    // Because Cesium throws an error, if `name: undefined` is passed above.
    entity.name = name;

    console.log("Created new entity", entity);
    return entity;
}

export {
    Animal,
    Deployment,
    Movebank,
    MovebankStudy,
    NO_DATA_AVAILABLE
};
