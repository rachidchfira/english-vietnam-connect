
-- Update the handle_new_teacher_user function to include passport_number
CREATE OR REPLACE FUNCTION public.handle_new_teacher_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.teachers (
        user_id, 
        name, 
        email, 
        passport_number,
        visa_type,
        visa_expiry,
        qualifications
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'passport_number', 'TEMP-' || gen_random_uuid()),
        'Not Specified',
        CURRENT_DATE + INTERVAL '1 year',
        'Not Specified'
    );
    
    -- Also insert the teacher role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'teacher');
    
    RETURN NEW;
END;
$$;
