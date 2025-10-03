/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// This configuration maps photographic effects to specific sub-styles.
// The UI will use this to dynamically display relevant effect options.

interface Effect {
    key: string;
    nameKey: string;
}

export const PHOTOGRAPHIC_EFFECTS_CONFIG: Record<string, Effect[]> = {
    portrait_studio: [
        { key: 'rembrandt_lighting', nameKey: 'effect_rembrandt_lighting' },
        { key: 'high_key', nameKey: 'effect_high_key' },
        { key: 'low_key', nameKey: 'effect_low_key' },
        { key: 'hard_light_flash', nameKey: 'effect_hard_light_flash' },
        { key: 'softbox', nameKey: 'effect_softbox' },
        { key: 'color_gels', nameKey: 'effect_color_gels' },
        { key: 'studio_bokeh', nameKey: 'effect_studio_bokeh' },
    ],
    lifestyle_exterieur: [
        { key: 'golden_hour', nameKey: 'effect_golden_hour' },
        { key: 'blue_hour', nameKey: 'effect_blue_hour' },
        { key: 'natural_lens_flare', nameKey: 'effect_natural_lens_flare' },
        { key: 'vintage_35mm', nameKey: 'effect_vintage_35mm' },
        { key: 'cinematic_framing', nameKey: 'effect_cinematic_framing' },
        { key: 'long_exposure_motion', nameKey: 'effect_long_exposure_motion' },
    ],
    photographie_voyage: [
        { key: 'wide_angle_silhouette', nameKey: 'effect_wide_angle_silhouette' },
        { key: 'saturated_postcard', nameKey: 'effect_saturated_postcard' },
        { key: 'hdr_landscape', nameKey: 'effect_hdr_landscape' },
        { key: 'backlight_silhouette', nameKey: 'effect_backlight_silhouette' },
        { key: 'urban_motion', nameKey: 'effect_urban_motion' },
        { key: 'color_splash', nameKey: 'effect_color_splash' },
    ],
    photographie_rue: [
        { key: 'doisneau_contrast_bw', nameKey: 'effect_doisneau_contrast_bw' },
        { key: 'motion_blur', nameKey: 'effect_motion_blur' },
        { key: 'night_long_exposure', nameKey: 'effect_night_long_exposure' },
        { key: 'high_speed_snapshot', nameKey: 'effect_high_speed_snapshot' },
        { key: 'retro_film_grain', nameKey: 'effect_retro_film_grain' },
        { key: 'reflection_composition', nameKey: 'effect_reflection_composition' },
    ],
    corporate_affaires: [
        { key: 'pro_neutral_background', nameKey: 'effect_pro_neutral_background' },
        { key: 'classic_triangle_lighting', nameKey: 'effect_classic_triangle_lighting' },
        { key: 'elegant_bw', nameKey: 'effect_elegant_bw' },
        { key: 'window_lighting', nameKey: 'effect_window_lighting' },
        { key: 'dramatic_chiaroscuro', nameKey: 'effect_dramatic_chiaroscuro' },
        { key: 'office_lifestyle_blur', nameKey: 'effect_office_lifestyle_blur' },
    ],
    nb_dramatique: [
        { key: 'high_contrast', nameKey: 'effect_high_contrast' },
        { key: 'film_grain', nameKey: 'effect_film_grain' },
        { key: 'high_key_bw', nameKey: 'effect_high_key_bw' },
        { key: 'low_key_bw', nameKey: 'effect_low_key_bw' },
        { key: 'backlight_silhouette_bw', nameKey: 'effect_backlight_silhouette_bw' },
        { key: 'textured_portrait', nameKey: 'effect_textured_portrait' },
    ],
    sepia_vintage: [
        { key: 'yellowed_photo', nameKey: 'effect_yellowed_photo' },
        { key: 'film_1920', nameKey: 'effect_film_1920' },
        { key: 'polaroid_edges', nameKey: 'effect_polaroid_edges' },
        { key: 'old_photo_double_exposure', nameKey: 'effect_old_photo_double_exposure' },
        { key: 'dusty_grain', nameKey: 'effect_dusty_grain' },
        { key: 'studio_portrait_40s', nameKey: 'effect_studio_portrait_40s' },
    ],
    double_exposition_artistique: [
        { key: 'silhouette_landscape', nameKey: 'effect_silhouette_landscape' },
        { key: 'portrait_texture', nameKey: 'effect_portrait_texture' },
        { key: 'face_buildings', nameKey: 'effect_face_buildings' },
        { key: 'shadow_sea', nameKey: 'effect_shadow_sea' },
        { key: 'multiple_faces', nameKey: 'effect_multiple_faces' },
        { key: 'psychedelic_colors', nameKey: 'effect_psychedelic_colors' },
    ],
    sport_action: [
        { key: 'freeze_motion', nameKey: 'effect_freeze_motion' },
        { key: 'panning', nameKey: 'effect_panning' },
        { key: 'speed_blur', nameKey: 'effect_speed_blur' },
        { key: 'impact_capture', nameKey: 'effect_impact_capture' },
        { key: 'extreme_motion', nameKey: 'effect_extreme_motion' },
        { key: 'dynamic_closeup', nameKey: 'effect_dynamic_closeup' },
    ],
    portrait_environnemental: [
        { key: 'subject_integrated', nameKey: 'effect_subject_integrated' },
        { key: 'silhouette_sharp_env', nameKey: 'effect_silhouette_sharp_env' },
        { key: 'wide_angle_framing', nameKey: 'effect_wide_angle_framing' },
        { key: 'natural_decor_light', nameKey: 'effect_natural_decor_light' },
        { key: 'shallow_dof', nameKey: 'effect_shallow_dof' },
        { key: 'storytelling_mood', nameKey: 'effect_storytelling_mood' },
    ],
    lumiere_golden_hour: [
        { key: 'sunset_silhouette', nameKey: 'effect_sunset_silhouette' },
        { key: 'golden_reflection_portrait', nameKey: 'effect_golden_reflection_portrait' },
        { key: 'warm_round_flare', nameKey: 'effect_warm_round_flare' },
        { key: 'warm_orange_tone', nameKey: 'effect_warm_orange_tone' },
        { key: 'long_soft_shadows', nameKey: 'effect_long_soft_shadows' },
        { key: 'water_sunset_reflection', nameKey: 'effect_water_sunset_reflection' },
    ],
    lumiere_blue_hour: [
        { key: 'deep_blue_sky', nameKey: 'effect_deep_blue_sky' },
        { key: 'cold_backlight', nameKey: 'effect_cold_backlight' },
        { key: 'urban_silhouette_lamps', nameKey: 'effect_urban_silhouette_lamps' },
        { key: 'mixed_lighting', nameKey: 'effect_mixed_lighting' },
        { key: 'night_portrait_glowing_bg', nameKey: 'effect_night_portrait_glowing_bg' },
        { key: 'thriller_movie_effect', nameKey: 'effect_thriller_movie_effect' },
    ],
    haute_vitesse_eclaboussure: [
        { key: 'suspended_water_drops', nameKey: 'effect_suspended_water_drops' },
        { key: 'frozen_colored_powder', nameKey: 'effect_frozen_colored_powder' },
        { key: 'extreme_sport_stopped', nameKey: 'effect_extreme_sport_stopped' },
        { key: 'exploding_liquid', nameKey: 'effect_exploding_liquid' },
        { key: 'macro_closeup_frozen_splash', nameKey: 'effect_macro_closeup_frozen_splash' },
        { key: 'hair_fabric_stopped_motion', nameKey: 'effect_hair_fabric_stopped_motion' },
    ],
    lumiere_naturelle_fenetre: [
        { key: 'portrait_light_beam', nameKey: 'effect_portrait_light_beam' },
        { key: 'soft_side_light', nameKey: 'effect_soft_side_light' },
        { key: 'geometric_shadows', nameKey: 'effect_geometric_shadows' },
        { key: 'dramatic_chiaroscuro_effect', nameKey: 'effect_dramatic_chiaroscuro_effect' },
        { key: 'overexposed_window_backlight', nameKey: 'effect_overexposed_window_backlight' },
        { key: 'intimate_mood', nameKey: 'effect_intimate_mood' },
    ],
};
