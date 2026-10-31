-- Leads captured by forms, the spec builder, the document basket and the AI assistant.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null,
  name text not null,
  email text not null,
  company text, role text, phone text, country text, market text,
  project text, quantity text, timeline text,
  documents text[] default '{}',
  transcript text,
  consent boolean not null check (consent),
  page text,
  score int,
  territory text
);
alter table public.leads enable row level security;
-- No policies: only the service role (server) can read/write.

-- AI assistant conversation log (phase 2: QA dashboard + unanswered-questions report).
create table if not exists public.chat_messages (
  id bigint generated always as identity primary key,
  conversation_id uuid not null,
  created_at timestamptz not null default now(),
  role text not null check (role in ('user', 'assistant', 'tool')),
  content text not null,
  page text,
  tools_used text[] default '{}'
);
create index if not exists chat_messages_conversation_idx on public.chat_messages (conversation_id, created_at);
alter table public.chat_messages enable row level security;

-- Phase 2 RAG: document chunks with embeddings (pgvector).
create extension if not exists vector;
create table if not exists public.doc_chunks (
  id bigint generated always as identity primary key,
  document_id text not null,
  product text,
  doc_type text,
  language text default 'en',
  version text,
  content text not null,
  embedding vector(1024)
);
alter table public.doc_chunks enable row level security;
