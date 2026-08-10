-- Migration: Add agent_assigned column to inquiries table
-- Adds a foreign key reference to the agents table so an inquiry
-- can be assigned to a specific agent. Existing rows are left NULL.
-- On delete, the reference is set to NULL (assignment is optional).

ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS agent_assigned uuid references public.agents(id) on delete set null;

-- Index to speed up lookups of inquiries assigned to a given agent
CREATE INDEX IF NOT EXISTS idx_inquiries_agent_assigned ON public.inquiries(agent_assigned);
